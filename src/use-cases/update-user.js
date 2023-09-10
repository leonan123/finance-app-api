import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  PostgresGetUserByEmailRepository,
  PostgresUpdateUserRepository,
} from '../repositories/postgres/index.js'

export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

      const userWithProvidedEmail =
        await postgresGetUserByEmailRepository.execute(updateUserParams.email)

      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(updateUserParams.email)
      }
    }

    const user = {
      ...updateUserParams,
    }

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

      user.password = hashedPassword
    }

    const updateUserRepository = new PostgresUpdateUserRepository()
    const updatedUser = await updateUserRepository.execute(userId, user)

    return updatedUser
  }
}
