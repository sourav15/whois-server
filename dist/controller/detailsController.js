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
exports.getDetails = void 0;
const superagent_1 = __importDefault(require("superagent"));
const redisClient_1 = __importDefault(require("../connections/redisClient"));
const getDetails = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheData = yield redisClient_1.default.get(url);
    if (cacheData) {
        return JSON.parse(cacheData);
    }
    const details = yield superagent_1.default
        .get(`https://api.jsonwhoisapi.com/v1/whois?identifier=${url}`)
        .set("Authorization", "72z8d0vRf09J2mdmJ7J9TQ")
        .set("accept", "json");
    if (details.body) {
        redisClient_1.default.set(url, JSON.stringify(details.body), { EX: 300 });
        return details.body;
    }
    return;
});
exports.getDetails = getDetails;
//# sourceMappingURL=detailsController.js.map