import {
  checkIfIdIsValid,
  invalidIdResponse,
} from '../../controllers/helpers/index.js'

export class DeleteTransactionUseCase {
  constructor(deleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository
  }

  async execute(transactionId) {
    const idIsValid = checkIfIdIsValid(transactionId)

    if (!idIsValid) {
      return invalidIdResponse()
    }

    const transactionDeleted =
      await this.deleteTransactionRepository(transactionId)

    return transactionDeleted
  }
}
