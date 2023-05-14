// // 加入這段 code, 僅在非正式環境時, 使用 dotenv
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
const bcrypt = require("bcryptjs") // 載入 bcryptjs model
const Record = require('../record') // 載入 record model
const Category = require('../category') //載入 category model
const db = require('../../config/mongoose') // 載入 mongoose
const User = require("../user") // 載入 user
const seedRecord = require('./record.json') //載入 json
const category = require("../category")

//把「兩個使用者」的資料定義成 SEED_USER 物件
const SEED_USER = {
  name: '廣志',
  email: 'user1@test.com',
  password: '12345678',
}





//新增資料
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      return Promise.all(seedRecord.map(item => {
        return Category.findOne({ name: item.category })
          .then(category => {
            return Record.create({
              name: item.name,
              date: item.date,
              amount: item.amount,
              categoryId: category._id,
              userId: user._id
            })
          })
      }))
    })
    .then(() => {
      console.log('Record seeder is done!')
      process.exit()  //關閉這段 Node 執行程序
    })
})