import validator from 'validator'
import { badRequest } from './http'

export const invalidAmountResponse = () => {
  return badRequest({
    message: 'The amount must be a valid currency',
  })
}

export const invalidTypeResponse = () => {
  return badRequest({
    message: 'Type must be EARNING, EXPENSE or INVESTMENT',
  })
}

export const checkIfAmountIsValid = (amount) => {
  return validator.isCurrency(amount.toString(), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: '.',
  })
}

export const checkIfTypeIsValid = (type) => {
  const validTypes = ['EARNING', 'EXPENSE', 'INVESTMENT']
  return validTypes.includes(type)
}
