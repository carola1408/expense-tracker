const db = require('../../config/mongoose.js') // 載入 mongoose
const Category = require('../category') // 載入 category model
const seedCategory = require('./category.json') //載入 json

//新增資料
db.once('open', () => {
  Category
    .create(seedCategory)
    .then(() => {
      console.log('Category seeder is done!')
      process.exit()
    })
    .catch(error => console.error(error))
})