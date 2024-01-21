import { EmailAlreadyInUseError } from '../../errors/user.js'
import { createUserSchema } from '../../schemas/user.js'
import { badRequest, created, serverError } from '../helpers/index.js'

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const { success, error } = await createUserSchema.safeParseAsync(params)

      if (!success) {
        return badRequest({ message: error.issues[0].message })
      }

      const createdUser = await this.createUserUseCase.execute(params)

      return created(createdUser)
    } catch (error) {
      console.error(error)

      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }

      return serverError()
    }
  }
}
