"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redisClient_1 = require("./connections/redisClient");
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
(0, redisClient_1.connectRedis)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(router_1.default);
app.use((err, _req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err && err.statusCode) {
        res
            .status(err.statusCode)
            .send({ status: err.statusCode, message: err.message });
    }
    else if (err) {
        res.status(500).json(err.message);
    }
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map