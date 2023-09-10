import validator from 'validator'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { badRequest, ok, serverError } from './helpers/http.js'
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
} from './helpers/user.js'

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params
      const isIdValid = validator.isUUID(userId)

      if (!isIdValid) {
        return invalidIdResponse()
      }

      const params = httpRequest.body

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
      const someFieldsIsNotAllowed = Object.keys(params).some((field) => !allowedFields.includes(field))

      if (someFieldsIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed!',
        })
      }

      if (params.password) {
        const passwordIsNotValid = checkIfPasswordIsValid(params.password)
        if (passwordIsNotValid) {
          return invalidPasswordResponse()
        }
      }

      if (params.email) {
        const emailIsValid = checkIfEmailIsValid(params.email)
        if (!emailIsValid) {
          return invalidEmailResponse()
        }
      }

      const updateUserUseCase = new UpdateUserUseCase()
      const updatedUser = await updateUserUseCase.execute(userId, params)

      return ok(updatedUser)
    } catch (error) {
      console.log(error)

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }

      return serverError()
    }
  }
}
