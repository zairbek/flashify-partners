export interface SignUpValidation {
  message: string,
  errors: {
    phone: string[]
    code: string[]
  }
}
