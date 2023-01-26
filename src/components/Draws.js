"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useDraw_1 = __importDefault(require("../hooks/useDraw"));
const Draws = () => {
    const { draws, stats, sum, probability, isToday, setIsToday } = (0, useDraw_1.default)();
    return (react_1.default.createElement("div", { className: "2xl:px-16 xl:px-16 px-6 py-4 font-mono" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { className: "flex items-center gap-2 text-slate-400" },
                "Aujourd'hui?",
                react_1.default.createElement("input", { type: "checkbox", checked: isToday, onChange: () => setIsToday(!isToday) }))),
        react_1.default.createElement("div", { className: "flex gap-2 2xl:text-2xl xl:text-2xl text-lg mt-2" },
            react_1.default.createElement("h3", null, "Nombre(s) de tirage(s):"),
            react_1.default.createElement("span", { className: "font-bold" }, draws === null || draws === void 0 ? void 0 : draws.length)),
        react_1.default.createElement("div", { className: "mt-6" }, stats === null || stats === void 0 ? void 0 : stats.map((stat, index) => {
            return (react_1.default.createElement("div", { className: "flex w-full py-2" },
                react_1.default.createElement("span", { className: "w-8 text-xl" }, index + 1),
                react_1.default.createElement("span", { className: "flex justify-center items-center bg-slate-800", style: { width: `${((stat * 100) / sum) * 10}%` } },
                    react_1.default.createElement("p", null, stat)),
                react_1.default.createElement("p", { className: "ml-2 text-sm flex items-center justify-center px-2" }, Math.round(probability[index] * 10000) / 10000)));
        }))));
};
exports.default = Draws;
