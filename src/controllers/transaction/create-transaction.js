import {
  checkIfIdIsValid,
  created,
  invalidIdResponse,
  requiredFieldsIsMissingResponse,
  serverError,
  validateRequiredFields,
} from '../helpers/index.js'

import {
  checkIfAmountIsValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidTypeResponse,
} from '../helpers/transaction.js'

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body
      const requiredFields = ['userId', 'name', 'amount', 'type', 'date']

      const { ok: requiredFieldsWereProvided, missingFields } =
        validateRequiredFields(params, requiredFields)

      if (!requiredFieldsWereProvided) {
        return requiredFieldsIsMissingResponse(missingFields)
      }

      const userIdIsValid = checkIfIdIsValid(params.userId)

      if (!userIdIsValid) {
        return invalidIdResponse()
      }

      const amountIsValid = checkIfAmountIsValid(params.amount)

      if (!amountIsValid) {
        return invalidAmountResponse()
      }

      const type = params.type.trim().toUpperCase()
      const typeIsValid = checkIfTypeIsValid(type)

      if (!typeIsValid) {
        return invalidTypeResponse()
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      })

      return created(transaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
