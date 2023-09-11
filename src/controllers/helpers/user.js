import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () =>
  badRequest({
    message: 'Password must be at least 6 characters!',
  })

export const invalidEmailResponse = () =>
  badRequest({
    message: 'Invalid e-mail. Please provide a valid one!',
  })

export const invalidIdResponse = () =>
  badRequest({
    message: 'Provided id is not a valid UUID!',
  })

export const userNotFoundResponse = () =>
  notFound({
    message: 'User not found!',
  })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
