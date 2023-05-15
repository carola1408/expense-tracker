const Category = require('../category') // 載入 category model
const db = require('../../config/mongoose') // 載入 mongoose
const seedCategory = require('./category.json') //載入 json
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



//新增資料
db.once("open", () => {
  return Promise.all(
    seedCategory.map((category) => {
      return Category.create(category);
    })
  )
    .then(() => {
      console.log("Category seeder is done!");
      process.exit();
    })
    .catch((error) => console.log(error));
})

