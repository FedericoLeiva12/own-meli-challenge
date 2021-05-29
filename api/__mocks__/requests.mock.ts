import requests from '../src/libs/requests'

let apiHost: null | string = null;

requests.setup = (host) => apiHost = host;

requests.getApiHost = () => apiHost || ''

export function mockGetResponse(response: any) {
  requests.get = () => Promise.resolve(response)
}

export function mockGetReject(response: any) {
  requests.get = () => Promise.resolve(response)
}