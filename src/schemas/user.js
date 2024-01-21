import { z } from 'zod'

export const createUserSchema = z.object({
  first_name: z
    .string({
      required_error: 'First name is required!',
    })
    .trim()
    .min(1, {
      message: 'The first name cannot be empty!',
    })
    .max(255),

  last_name: z
    .string({
      required_error: 'Last name is required!',
    })
    .trim()
    .min(1, {
      message: 'The last name cannot be empty!',
    })
    .max(255),

  email: z
    .string({
      required_error: 'Email is required!',
    })
    .trim()
    .min(1, {
      message: 'The email cannot be empty!',
    })
    .max(255)
    .email({
      message: 'The email is invalid!',
    }),

  password: z
    .string({
      required_error: 'Password is required!',
    })
    .trim()
    .min(8, {
      message: 'The password must have at least 8 characters!',
    })
    .max(255),
})

export const updateUserSchema = createUserSchema
  .partial()
  .extend({
    user_id: z.string().trim().uuid({
      message: 'Provided id is not a valid UUID!',
    }),
  })
  .strict({
    message: 'Some provided field is not allowed!',
  })
  .refine(
    (data) => {
      const params = Object.keys(data).filter((key) => key !== 'user_id')

      if (Object.keys(params).length === 0) {
        return false
      }

      return true
    },
    {
      message: 'At least one field must be provided!',
      path: [],
      type: 'invalid_type',
    },
  )
