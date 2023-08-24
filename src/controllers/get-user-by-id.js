import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, notFound, ok, serverError } from './helpers.js'

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params
      const isIdValid = validator.isUUID(userId)

      if (!isIdValid) {
        return badRequest({
          message: 'Provided id is not a valid UUID!',
        })
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
