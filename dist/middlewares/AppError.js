"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message) {
        if (message) {
            super(message);
        }
        else {
            super("A generic error occured!");
        }
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
//export default AppError;
//# sourceMappingURL=AppError.js.map