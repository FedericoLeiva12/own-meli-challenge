"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError = /** @class */ (function () {
    function CustomError(message, code, fullError) {
        this.name = 'Request error';
        this.message = message;
        this.code = code;
        this.fullError = fullError || {};
    }
    return CustomError;
}());
exports.default = CustomError;
