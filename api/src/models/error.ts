export default class CustomError implements Error {
  public code: number
  public name: string
  public message: string
  public stack?: string | undefined
  public fullError: {}
  constructor (message: any, code: number, fullError?: {}) {
    this.name = 'Request error'
    this.message = message
    this.code = code
    this.fullError = fullError || {}
  }
}