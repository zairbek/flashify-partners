export interface SignInPhoneValidation {
  message: string,
  errors: {
    phone: string[]
    code: string[]
  }
}
