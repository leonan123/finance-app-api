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
      const params = httpRequest.body

      const idIsValid = checkIfIdIsValid(params.transactionId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const allowedFields = ['name', 'date', 'amount', 'type']

      const someFieldsIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldsIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed!',
        })
      }

      if (params.amount) {
        const amountIsValid = checkIfAmountIsValid(params.amount)
        if (!amountIsValid) {
          return invalidAmountResponse()
        }
      }

      if (params.type) {
        const typeIsValid = checkIfTypeIsValid(params.type)

        if (!typeIsValid) {
          return invalidTypeResponse()
        }
      }

      const updatedTransaction = await this.updateTransactionUseCase.execute(
        params.transactionId,
        params,
      )

      return ok(updatedTransaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
