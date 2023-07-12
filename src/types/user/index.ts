export interface User {
  uuid: string,
  login: string,
  email: string|null,
  phone?: {
    regionIsoCode: string,
    number: string
  },
  name: {
    firstName?: string,
    lastName?: string
  },
  status: string
}
