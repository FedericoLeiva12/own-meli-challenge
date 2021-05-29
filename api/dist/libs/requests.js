"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var error_1 = __importDefault(require("../models/error"));
var Requests = /** @class */ (function () {
    function Requests() {
    }
    Requests.setup = function (apiHost) {
        Requests.apiHost = apiHost;
    };
    Requests.get = function (endpoint, headers) {
        return axios_1.default.get(Requests.apiHost + "/" + endpoint, {
            headers: headers,
        }).then(function (response) {
            return response.data;
        }).catch(function (err) {
            if (err.response) {
                throw new error_1.default(err.response.data, err.response.status, err);
            }
            throw new error_1.default('Error in the request', -2, err);
        });
    };
    Requests.post = function (endpoint, body, headers) {
        return axios_1.default.post(Requests.apiHost + ":" + endpoint, body, {
            headers: headers,
        }).then(function (response) {
            return response.data;
        }).catch(function (err) {
            if (err.response) {
                throw new error_1.default(err.response.data, err.response.status, err);
            }
            throw new error_1.default('Error in the request', -2, err);
        });
    };
    Requests.getApiHost = function () { return Requests.apiHost; };
    return Requests;
}());
exports.default = Requests;
