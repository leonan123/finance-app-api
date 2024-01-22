import validator from 'validator'
import { z } from 'zod'

export const createTransactionSchema = z
  .object({
    user_id: z
      .string({
        required_error: 'User id is required!',
      })
      .uuid({
        message: 'User id must be a valid uuid!',
      }),

    name: z
      .string({
        required_error: 'Name is required!',
      })
      .trim()
      .min(1, {
        message: 'Name must be at least 1 character long!',
      })
      .max(50, {
        message: 'Name must be at most 50 characters long!',
      }),

    type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
      errorMap: () => ({
        message: 'Type must be EXPENSE, EARNING or INVESTMENT!',
      }),
    }),

    date: z
      .string({
        required_error: 'Date is required!',
      })
      .datetime({
        message: 'Date must be a valid date!',
      }),

    amount: z
      .number({
        invalid_type_error: 'Amount must be a number!',
        required_error: 'Amount is required!',
      })
      .refine(
        (value) => {
          return validator.isCurrency(value.toString(), {
            digits_after_decimal: [2],
            allow_negatives: false,
            decimal_separator: '.',
          })
        },
        {
          message: 'Amount must be a valid currency!',
        },
      ),
  })
  .strict({
    message: 'Unexpected attributes!',
  })
