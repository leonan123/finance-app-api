import {
  checkIfIdIsValid,
  invalidIdResponse,
  requiredFieldsIsMissingResponse,
  serverError,
  ok,
  transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const { transactionId } = httpRequest.params

      if (!transactionId) {
        return requiredFieldsIsMissingResponse(['transactionId'])
      }

      const idIsValid = checkIfIdIsValid(transactionId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const deletedTransaction =
        await this.deleteTransactionUseCase.execute(transactionId)

      if (!deletedTransaction) {
        return transactionNotFoundResponse()
      }

      return ok(deletedTransaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
