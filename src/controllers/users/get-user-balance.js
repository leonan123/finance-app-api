import { UserNotFoundError } from '../../errors/user.js'
import { checkIfIdIsValid, invalidIdResponse, ok } from '../helpers'
import { serverError, userNotFoundResponse } from '../helpers.js'

export class GetUserBalanceController {
  constructor(getUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase
  }

  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params
      const idIsValid = checkIfIdIsValid(userId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const balance = await this.getUserBalanceUseCase.execute({ userId })

      return ok(balance)
    } catch (error) {
      console.error(error)

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse()
      }

      return serverError()
    }
  }
}
