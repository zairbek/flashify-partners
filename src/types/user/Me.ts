export interface UpdateMeValidation {
  message: string,
  errors: {
    firstName: string[]
    lastName: string[]
  }
}
