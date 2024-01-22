import { createTransactionSchema } from '../../schemas/transaction.js'
import { badRequest, created, serverError } from '../helpers/index.js'

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const { success, error } =
        await createTransactionSchema.safeParseAsync(params)

      if (!success) {
        return badRequest({ message: error.issues[0].message })
      }

      const transaction = await this.createTransactionUseCase.execute(params)

      return created(transaction)
    } catch (error) {
      console.error(error)

      return serverError()
    }
  }
}
