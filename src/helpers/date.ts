const date = {
  currenDate() {
    let date: Date | string = new Date();
    let days: number | string = date.getDate();
    let months: number | string = date.getMonth() + 1;
    let years: number = date.getFullYear();

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

export default date;
