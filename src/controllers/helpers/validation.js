import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
  badRequest({
    message: 'Provided id is not a valid UUID!',
  })

export const checkIfIsString = (value) => typeof value === 'string'

/**
 * Validates the required fields in the given parameters object.
 *
 * @param {object} params - The parameters object to validate.
 * @param {array} requiredFields - An array of field names that are required.
 * @return {object} An object indicating whether the validation was successful,
 * and the fields that are missing.
 */
export const validateRequiredFields = (params, requiredFields) => {
  const someFieldsIsNotAllowed = requiredFields.filter((field) => {
    const fieldIsMissing = !params[field]
    const fieldIsEmpty =
      checkIfIsString(params[field]) && validator.isEmpty(params[field])

    if (fieldIsMissing || fieldIsEmpty) {
      return field
    }
  })

  console.log(
    '🚀 ~ file: validation.js:32 ~ validateRequiredFields ~ if:',
    someFieldsIsNotAllowed,
  )

  if (someFieldsIsNotAllowed.length) {
    return {
      ok: false,
      missingFields: someFieldsIsNotAllowed,
    }
  }

  return {
    ok: true,
    missingFields: [],
  }
}
