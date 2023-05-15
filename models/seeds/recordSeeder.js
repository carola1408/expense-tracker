// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require("bcryptjs") // 載入 bcryptjs model
const Record = require('../record') // 載入 record model
const db = require('../../config/mongoose') // 載入 mongoose
const User = require("../user") // 載入 user
const seedRecord = require('./record.json') //載入 json


//把「兩個使用者」的資料定義成 SEED_USER 物件
const SEED_USER = [{
  name: '廣志',
  email: 'user1@test.com',
  password: '12345678',
  recordIndex: [0, 1, 2],
}]





//新增資料
db.once("open", () => {
  return Promise.all(
    SEED_USER.map((user) => {
      const { name, email, password, recordIndex } = user;
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      }).then((user) => {
        const userId = user._id;
        const records = recordIndex.map((index) => {
          return { ...seedRecord[index], userId }
        });
        return Record.create(records)
      })
    })
  )
    .then(() => {
      console.log("Record seeder is done!")
      process.exit() //關閉這段 Node 執行程序
    })
    .catch((err) => console.log(err));
})