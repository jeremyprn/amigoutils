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
const react_1 = require("react");
const amigoRepository_1 = __importDefault(require("../repositories/amigoRepository"));
function useDraw() {
    const [draws, setDraws] = (0, react_1.useState)();
    const [stats, setStats] = (0, react_1.useState)();
    const [probability, setProbability] = (0, react_1.useState)([]);
    const [sum, setStum] = (0, react_1.useState)();
    const [isToday, setIsToday] = (0, react_1.useState)(false);
    const getDraws = () => __awaiter(this, void 0, void 0, function* () { return setDraws(yield amigoRepository_1.default.getDraws(isToday)); });
    function calculateSum(stats) {
        let globalSum = 0;
        for (let i = 0; i <= stats.length - 1; i++) {
            globalSum += stats[i];
        }
        setStum(globalSum);
    }
    const countOccurences = () => {
        const result = [];
        const counter = {};
        function count(numbers) {
            for (let num of numbers) {
                counter[num] = (counter[num] || 0) + 1;
            }
        }
        draws === null || draws === void 0 ? void 0 : draws.forEach((draw) => {
            if (draw.length === 12)
                count(draw);
        });
        for (let key in counter) {
            result.push(counter[key]);
        }
        setStats(result);
        calculateSum(result);
    };
    function calculateAllProbabilities() {
        for (let i = 1; i <= 28; i++) {
            setProbability((old) => [...old, calculateProbability(draws, i)]);
        }
    }
    function calculateProbability(previousDraws, targetNumber) {
        const numbersTotal = 28;
        let numbersDrawn = 0;
        // Loop through all previous draws
        for (let i = 0; i < previousDraws.length; i++) {
            // Loop through numbers of specific draw
            for (let j = 0; j < previousDraws[i].length; j++) {
                // Add count if number has been drawn already
                if (previousDraws[i][j] === targetNumber) {
                    numbersDrawn++;
                }
            }
        }
        // Calculate probability by dividing total num of numbers with numbers already drawn
        const probability = numbersTotal / numbersDrawn;
        return probability;
    }
    (0, react_1.useEffect)(() => {
        getDraws();
    }, [isToday]);
    (0, react_1.useEffect)(() => {
        if (draws) {
            countOccurences();
            calculateAllProbabilities();
        }
    }, [draws]);
    return { draws, stats, sum, probability, isToday, setIsToday };
}
exports.default = useDraw;
