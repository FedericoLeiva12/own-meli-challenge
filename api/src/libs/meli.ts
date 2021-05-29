import { IProduct } from "../compiler/types"
import CustomError from "../models/error"
import Requests from "./requests"

export default class MeliApi {
  static setup () {
    Requests.setup(process.env.MELI_API_HOST || '')
  }

  static getProductByQuery (query: string) {
    if (!/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(query)) {
      return Promise.reject(new CustomError('Invalid query', -1))
    }

    return Requests.get(`search?q=${query}&limit=10`)
      .then((response) => {
        const products = response
        return products
      })
  }
}