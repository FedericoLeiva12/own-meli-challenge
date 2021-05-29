jest.mock('../../src/libs/requests')

import MeliApi from "../../src/libs/meli"
import Requests from "../../src/libs/requests"
import { productsMock } from "../../__mocks__/productsMock"
import { mockGetResponse } from "../../__mocks__/requests.mock"

describe('Mercado Libre Lib', () => {
  it ('should set api url', () => {
    process.env = {
      MELI_API_HOST: 'test',
    };

    MeliApi.setup()
    
    expect(Requests.getApiHost()).toEqual('test')
  })

  it ('should search products by query', async () => {
    // Mock server response
    mockGetResponse({
      data: { results: productsMock },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })

    const catchMock = jest.fn();

    MeliApi.getProductByQuery('some query')
      .then((res) => {
        expect(res).toEqual(productsMock)
      })
      .catch(catchMock);
    
    expect(catchMock).not.toBeCalled()
  })

  it ('should require only numbers, letters and spaces', () => {
    MeliApi.getProductByQuery('Some invalid Query &^^%#!@')
      .catch((err) => {
        expect(err.message).toEqual('Invalid query');
      })
  })
})
