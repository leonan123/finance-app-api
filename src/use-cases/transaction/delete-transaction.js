export class DeleteTransactionUseCase {
  constructor(deleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository
  }

  async execute(transactionId) {
    const transactionDeleted =
      await this.deleteTransactionRepository.execute(transactionId)

    return transactionDeleted
  }
}
