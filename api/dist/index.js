"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
var meli_1 = __importDefault(require("./libs/meli"));
dotenv_1.default.config();
meli_1.default.setup();
app_1.default.listen(process.env.PORT, function () {
    console.info("Listening on", process.env.PORT);
});
