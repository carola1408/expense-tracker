// const Category = require('../category') // 載入 category model
// const db = require('../../config/mongoose') // 載入 mongoose
// const seedCategory = require('./category.json') //載入 json
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }



// //新增資料
// // db.once("open", () => {
// //   return Promise.all(
// //     seedCategory.map((category) => {
// //       return Category.create(category);
// //     })
// //   )
// //     .then(() => {
// //       console.log("Category seeder is done!");
// //       process.exit();
// //     })
// //     .catch((error) => console.log(error));
// // })

// db.once('open', () => {
//   Category
//     .create(seedCategory)
//     .then(() => {
//       console.log('Category seeder is done!')
//       process.exit()
//     })
//     .catch(error => console.error(error))
// })
const db = require('../../config/mongoose.js')
const Category = require('../category')
const seedCategory = [
  {
    name: '家居物業',
    icon: 'fas fa-home'
  },
  {
    name: '交通出行',
    icon: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    icon: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fas fa-utensils'
  },
  {
    name: '其他',
    icon: 'fas fa-pen'
  }
]

db.once('open', () => {
  Category
    .create(seedCategory)
    .then(() => {
      console.log('Category seeder is done!')
      process.exit()
    })
    .catch(error => console.error(error))
})