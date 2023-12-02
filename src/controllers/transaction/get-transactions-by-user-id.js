import { UserNotFoundError } from '../../errors/user'
import { ok, serverError } from '../helpers/http'
import { userNotFoundResponse } from '../helpers/user'
import {
  checkIfIdIsValid,
  invalidIdResponse,
  requiredFieldsIsMissingResponse,
} from '../helpers/validation'

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
