import { UserNotFoundError } from '../../errors/user.js'
import { ok, serverError } from '../helpers/http.js'
import { userNotFoundResponse } from '../helpers/user.js'
import {
  checkIfIdIsValid,
  invalidIdResponse,
  requiredFieldsIsMissingResponse,
} from '../helpers/validation.js'

export class GetTransactionsByUserIdController {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
  }

  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.query

      if (!userId) {
        return requiredFieldsIsMissingResponse(['userId'])
      }

      const userIdIsValid = checkIfIdIsValid(userId)

      if (!userIdIsValid) {
        return invalidIdResponse()
      }

      const transactions =
        await this.getTransactionsByUserIdUseCase.execute(userId)

      return ok(transactions)
    } catch (error) {
      console.error(error)

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse()
      }

      return serverError()
    }
  }
}
