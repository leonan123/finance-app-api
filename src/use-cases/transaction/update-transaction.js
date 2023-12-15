import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
  constructor(updateTransactionRepository, getUserByIdRepository) {
    this.updateTransactionRepository = updateTransactionRepository
    this.getUserByIdRepository = getUserByIdRepository
  }

  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId)

    if (!user) {
      return UserNotFoundError()
    }

    const updatedTransaction = await this.updateTransactionRepository.execute(
      params.userId,
      params.updateTransactionParams,
    )

    return updatedTransaction
  }
}
