export class EmailAlreadyInUseError extends Error {
  constructor(userEmail) {
    super(`The provided email ${userEmail} is already in use!`)
    this.name = 'EmailAlreadyInUseError'
  }
}
