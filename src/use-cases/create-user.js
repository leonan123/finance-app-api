import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js'

export class CreateUserUseCase {
  async execute(createUserParams) {
    //TODO: Verificar se o email ja esta em uso
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()

    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email)

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email)
    }

    const userId = uuidv4()
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    }

    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const createdUser = await postgresCreateUserRepository.execute(user)

    return createdUser
  }
}
