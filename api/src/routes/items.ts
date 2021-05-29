import { Request, Response, Router, urlencoded } from 'express'
import { IProduct } from '../compiler/types'
import MeliApi from '../libs/meli'
import { APP_AUTHOR } from '../libs/utils'
import CustomError from '../models/error'

const itemsRoute = Router()

itemsRoute.use(urlencoded({ extended: true }))

itemsRoute.get('/', (req: Request, res: Response) => {
  const { query } = req.query

  if(!query || typeof query !== 'string') {
    return res.send({
      author: APP_AUTHOR,
      categories: [],
      items: []
    });
  }

  MeliApi.getProductByQuery(query)
    .then((result) => {
      const products: IProduct[] = result.results
      return {
        author: APP_AUTHOR,
        categories: result.filters.find((filter: any) => filter.id === 'category'),
        items: products.map((product: IProduct) => ({
          id: product.id,
          title: product.title,
          price: {
            currency: product.prices
          }
        }))
      }
    })
    .then((result) => {
      res.send(result)
    })
    .catch((err: CustomError) => {
      res.status(err.code > 0? err.code: 500)
      res.send({ error: err.message })
    })
})

export default itemsRoute
