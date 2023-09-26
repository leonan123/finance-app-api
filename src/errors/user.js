export class EmailAlreadyInUseError extends Error {
  constructor(userEmail) {
    super(`The provided email ${userEmail} is already in use!`)
    this.name = 'EmailAlreadyInUseError'
  }
}

export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found.`)
    this.name = 'UserNotFoundError'
  }
}
