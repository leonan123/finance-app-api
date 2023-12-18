import { checkIfIdIsValid, invalidIdResponse, ok } from '../helpers'
import { requiredFieldsIsMissingResponse, serverError } from '../helpers.js'

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

      return ok(deletedTransaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
