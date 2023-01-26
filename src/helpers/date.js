"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date = {
    currenDate() {
        let date = new Date();
        let days = date.getDate();
        let months = date.getMonth() + 1;
        let years = date.getFullYear();
        if (days < 10) {
            days = "0" + days;
        }
        if (months < 10) {
            months = "0" + months;
        }
        date = days + "-" + months + "-" + years;
        return date; // Output: dd-mm-yyyy
    },
};
exports.default = date;
