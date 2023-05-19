// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require("bcryptjs") // 載入 bcryptjs model
const Record = require('../record') // 載入 record model
const db = require('../../config/mongoose') // 載入 mongoose
const User = require("../user") // 載入 user
const seedRecord = require('./record.json') //載入 json

//把「使用者」的資料定義成 SEED_USER 物件
const seedUser = {
  name: '廣志',
  email: 'user1@example.com',
  password: '123'

}

//新增資料
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: seedRecord.length }, (_, i) =>
          Record.create({
            name: seedRecord[i].name,
            category: seedRecord[i].category,
            date: seedRecord[i].date,
            amount: seedRecord[i].amount,
            userId
          })
        )
      )
    })
    .then(() => {
      console.log('Record seeder is done!')
      process.exit() //關閉這段 Node 執行程序
    })
    .catch((err) => console.error(err))
})
