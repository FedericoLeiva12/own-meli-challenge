"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var meli_1 = __importDefault(require("../libs/meli"));
var utils_1 = require("../libs/utils");
var itemsRoute = express_1.Router();
itemsRoute.use(express_1.urlencoded({ extended: true }));
itemsRoute.get('/', function (req, res) {
    var query = req.query.query;
    if (!query || typeof query !== 'string') {
        return res.send({
            author: utils_1.APP_AUTHOR,
            categories: [],
            items: []
        });
    }
    meli_1.default.getProductByQuery(query)
        .then(function (result) {
        var products = result.results;
        return {
            author: utils_1.APP_AUTHOR,
            categories: result.filters.find(function (filter) { return filter.id === 'category'; }),
            items: products.map(function (product) { return ({
                id: product.id,
                title: product.title,
                price: {
                    currency: product.prices
                }
            }); })
        };
    })
        .then(function (result) {
        res.send(result);
    })
        .catch(function (err) {
        res.status(err.code > 0 ? err.code : 500);
        res.send({ error: err.message });
    });
});
exports.default = itemsRoute;
