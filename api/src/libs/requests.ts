import axios from "axios";
import CustomError from "../models/error";

export default class Requests {
  private static apiHost: string;

  static setup (apiHost: string) {
    Requests.apiHost = apiHost;
  }

  static get (endpoint: string, headers?: any): Promise<any> {
    return axios.get(`${Requests.apiHost}/${endpoint}`, {
      headers,
    }).then(response => {
        return response.data
    }).catch((err) => {
      if (err.response) {
        throw new CustomError(err.response.data, err.response.status, err);
      }
      throw new CustomError('Error in the request', -2, err);
    })
  }

  static post (endpoint: string, body?: any, headers?: any): Promise<any> {
    return axios.post(`${Requests.apiHost}:${endpoint}`, body, {
      headers,
    }).then(response => {
        return response.data
    }).catch((err) => {
      if (err.response) {
        throw new CustomError(err.response.data, err.response.status, err);
      }
      throw new CustomError('Error in the request', -2, err);
    })
  }

  static getApiHost = () => Requests.apiHost;
}