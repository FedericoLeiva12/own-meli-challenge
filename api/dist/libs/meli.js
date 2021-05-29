"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = __importDefault(require("../models/error"));
var requests_1 = __importDefault(require("./requests"));
var MeliApi = /** @class */ (function () {
    function MeliApi() {
    }
    MeliApi.setup = function () {
        requests_1.default.setup(process.env.MELI_API_HOST || '');
    };
    MeliApi.getProductByQuery = function (query) {
        if (!/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(query)) {
            return Promise.reject(new error_1.default('Invalid query', -1));
        }
        return requests_1.default.get("search?q=" + query + "&limit=10")
            .then(function (response) {
            var products = response;
            return products;
        });
    };
    return MeliApi;
}());
exports.default = MeliApi;
