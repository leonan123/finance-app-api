import {
  badRequest,
  checkIfAmountIsValid,
  checkIfIdIsValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidIdResponse,
  invalidTypeResponse,
  ok,
  serverError,
} from '../helpers/index.js'

export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const transactionId = httpRequest.params.transactionId
      const idIsValid = checkIfIdIsValid(transactionId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const updateTransactionParams = httpRequest.body

      const allowedFields = ['name', 'date', 'amount', 'type']

      const someFieldsIsNotAllowed = Object.keys(updateTransactionParams).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed!',
        })
      }

      if (updateTransactionParams.amount) {
        const amountIsValid = checkIfAmountIsValid(
          updateTransactionParams.amount,
        )
        if (!amountIsValid) {
          return invalidAmountResponse()
        }
      }

      if (updateTransactionParams.type) {
        const typeIsValid = checkIfTypeIsValid(updateTransactionParams.type)

        if (!typeIsValid) {
          return invalidTypeResponse()
        }
      }

      const updatedTransaction = await this.updateTransactionUseCase.execute(
        transactionId,
        updateTransactionParams,
      )

      return ok(updatedTransaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
