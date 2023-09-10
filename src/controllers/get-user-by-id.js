import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { notFound, ok, serverError } from './helpers/http.js'
import { invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params
      const isIdValid = validator.isUUID(userId)

      if (!isIdValid) {
        return invalidIdResponse()
      }

      const getUserByIdUseCase = new GetUserByIdUseCase()
      const user = await getUserByIdUseCase.execute(userId)

      if (!user) {
        return notFound({ message: 'User not found!' })
      }

      return ok(user)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
