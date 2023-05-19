const Handlebars = require("handlebars");
const icon = {
  1: ["家居物業", "fa-solid fa-house"],
  2: ["交通出行", "fa-solid fa-van-shuttle"],
  3: ["休閒娛樂", "fa-solid fa-face-grin-beam"],
  4: ["餐飲食品", "fa-solid fa-utensils"],
  5: ["其他", "fa-solid fa-pen"],
};

Handlebars.registerHelper("icon", function (num) {
  return icon[num][1]
})

module.exports = {
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  }
}