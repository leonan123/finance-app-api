import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    const transactionDeleted = await PostgresHelper.query(
      `
      DELETE FROM transactions
      WHERE id = $1
      RETURNING *
    `,
      [transactionId],
    )

    return transactionDeleted[0]
  }
}
