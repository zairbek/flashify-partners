export const clear = (phoneNumber: string): string => {
  return phoneNumber.replace(/\(|\)|-|\s|\$/g, '')
}
