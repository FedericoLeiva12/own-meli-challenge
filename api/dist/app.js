"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var items_1 = __importDefault(require("./routes/items"));
var app = express_1.default();
app.use('/api/items', items_1.default);
exports.default = app;
