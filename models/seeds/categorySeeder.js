const Category = require('../category') // 載入 category model
const db = require('../../config/mongoose') // 載入 mongoose
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const categoryList = [
  { id: 1, name: "家居物業", imageUrl: 'fa-solid fa-house' },
  { id: 2, name: "交通出行", imageUrl: 'fa-solid fa-van-shuttle' },
  { id: 3, name: "休閒娛樂", imageUrl: 'fa-solid fa-face-grin-beam' },
  { id: 4, name: "餐飲食品", imageUrl: 'fa-solid fa-utensils' },
  { id: 5, name: "其他", imageUrl: 'fa-solid fa-pen' }

]



//新增資料
db.once("open", () => {
  return Promise.all(
    categoryList.map((category) => {
      return Category.create(category);
    })
  )
    .then(() => {
      console.log("Category seeder is done!");
      process.exit();
    })
    .catch((error) => console.log(error));
})
