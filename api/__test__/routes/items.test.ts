import { mockGetResponse } from '../../__mocks__/axios.mock'
import request from 'supertest'
import app from '../../src/app'
import { productsMock } from '../../__mocks__/productsMock'
import Ajv from 'ajv'

const ajv = new Ajv();

describe('route /api/items', () => {
  it ('should works', async (done) => {
    // Mock axios response
    mockGetResponse({
      data: { results: [], filters: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })
    
    const promise = request(app)
      .get('/api/items?query=test')
      .then((res) => {
        expect(res.status).toEqual(200)
        done()
      })

    return promise
  })

  it ('should return a list of products', async (done) => {
    // Mock axios response
    mockGetResponse({
      data: { results: productsMock, filters: [{
        "id": "category",
        "name": "Categories",
        "type": "text",
        "values": [
          {
            "id": "MLA109027",
            "name": "Zapatillas",
            "path_from_root": [
              {
                "id": "MLA1430",
                "name": "Ropa y Accesorios"
              },
              {
                "id": "MLA109026",
                "name": "Calzado"
              },
              {
                "id": "MLA109027",
                "name": "Zapatillas"
              }
            ]
          }]
        }]
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })

    const promise = request(app)
      .get('/api/items?query=test')
      .then((res) => {
        const response = JSON.parse(res.text)
        const items = response.items
        expect(typeof items).toEqual('object')
        expect(items.length).toBeGreaterThanOrEqual(1)
        done()
      })

    return promise
  })

  it ('should accept only alphanumeric and spaces', async (done) => {
    const promise = request(app)
      .get('/api/items?query=$asd')
      .then((res) => {
        expect(res.body.error).toEqual('Invalid query')
        done()
      })

    return promise
  })

  it ('should return a empty array if query is not sended', async (done) => {
    const promise = request(app)
      .get('/api/items')
      .then((res) => {
        const response = JSON.parse(res.text)
        const items = response.items
        expect(typeof items).toEqual('object')
        expect(items.length).toEqual(0)
        done()
      })

    return promise
  })
})
