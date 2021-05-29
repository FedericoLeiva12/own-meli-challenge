jest.mock('jest')

import Requests from "../../src/libs/requests"
import CustomError from "../../src/models/error";
import { mockGetReject, mockGetResponse, mockPostReject, mockPostResponse } from "../../__mocks__/axios.mock";

describe('Requests Library', () => {
  it('should setup api url', () => {
    Requests.setup('test')
    expect(Requests.getApiHost()).toEqual('test')
  })
  it('should GET content', async (done) => {
    // Mock server response
    mockGetResponse({
      data: { results: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })
    const promise = Requests.get('https://www.google.com/')
      .then((res) => {
        expect(res).toEqual({ results: [] });
        done()
      })

    return promise
  });

  it('should POST content', async (done) => {
    mockPostResponse({
      data: { results: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    })
    
    const promise = Requests.post('https://www.google.com/', { some: 'body' })
      .then((res) => {
        expect(res).toEqual({ results: [] });
        done()
      })

    return promise
  })

  it('should reject POST with status code', async (done) => {
    mockPostReject({
      response: {
        data: 'Not found',
        status: 404
      }
    })

    const promise = Requests.post('https://www.google.com/', { some: 'body' })
      .catch((err) => {
        expect(err instanceof CustomError).toBeTruthy()
        expect(err.code).toEqual(404)
        expect(err.message).toEqual('Not found')
        done()
      })

    return promise
  })

  it('should reject GET with status code', async (done) => {
    mockGetReject({
      response: {
        data: 'Not found',
        status: 404
      }
    })

    const promise = Requests.get('https://www.google.com/')
      .catch((err) => {
        expect(err instanceof CustomError).toBeTruthy()
        expect(err.code).toEqual(404)
        expect(err.message).toEqual('Not found')
        done()
      })

    return promise
  })

  it('should reject POST with status code -2', async (done) => {
    mockPostReject({ })
    const promise = Requests.post('https://www.goadgadgdogle.com/', { some: 'body' })
      .catch((err) => {
        expect(err instanceof CustomError).toBeTruthy()
        expect(err.code).toEqual(-2)
        expect(err.message).toEqual('Error in the request')
        done()
      })

    return promise
  })

  it('should reject GET with status code -2', async (done) => {
    mockGetReject({ })
    const promise = Requests.get('https://www.goadgadgdogle.com/')
      .catch((err) => {
        expect(err instanceof CustomError).toBeTruthy()
        expect(err.code).toEqual(-2)
        expect(err.message).toEqual('Error in the request')
        done()
      })

    return promise
  })
})