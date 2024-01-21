import { EmailAlreadyInUseError } from '../../errors/user.js'
import { updateUserSchema } from '../../schemas/index.js'
import { badRequest, ok, serverError } from '../helpers/index.js'

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }

  async execute(httpRequest) {
    try {
      const { userId } = httpRequest.params

      const bodyParams = httpRequest.body
      const { success, error } = await updateUserSchema.safeParseAsync({
        user_id: userId,
        ...bodyParams,
      })

      if (!success) {
        return badRequest({ message: error.issues[0].message })
      }

      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        bodyParams,
      )

      return ok(updatedUser)
    } catch (error) {
      console.error(error, { line: 63 })

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }

      return serverError()
    }
  }
}
