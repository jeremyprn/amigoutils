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
const date_1 = __importDefault(require("../helpers/date"));
const amigoRepository = {
    getDraws(today = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = date_1.default.currenDate();
                const httpCall = yield fetch(`https://www.fdj.fr/api/service-draws/v1/games/amigo/draws?include=results,attributes&order=-draw_day_index&range=0-250${today ? `&drawn_at=${currentDate}` : ""}`);
                const response = yield httpCall.json();
                const parsedResponse = response.map(draw => draw.results.map(number => Number(number.value)));
                return parsedResponse;
            }
            catch (error) {
                console.log(error);
            }
            return [];
        });
    }
};
exports.default = amigoRepository;
