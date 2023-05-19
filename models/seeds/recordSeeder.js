// // 加入這段 code, 僅在非正式環境時, 使用 dotenv
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
// const bcrypt = require("bcryptjs") // 載入 bcryptjs model
// const Record = require('../record') // 載入 record model
// const db = require('../../config/mongoose') // 載入 mongoose
// const User = require("../user") // 載入 user
// const seedRecord = require('./record.json') //載入 json


// //把「兩個使用者」的資料定義成 SEED_USER 物件
// const SEED_USER = {
//   name: '廣志',
//   email: 'user@test.com',
//   password: '1234',

// }





// // //新增資料
// // db.once("open", () => {
// //   return Promise.all(
// //     SEED_USER.map((user) => {
// //       const { name, email, password, recordIndex } = user;
// //       return User.create({
// //         name,
// //         email,
// //         password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
// //       }).then((user) => {
// //         const userId = user._id;
// //         const records = recordIndex.map((index) => {
// //           return { ...seedRecord[index], userId }
// //         });
// //         return Record.create(records)
// //       })
// //     })
// //   )
// //     .then(() => {
// //       console.log("Record seeder is done!")
// //       process.exit() //關閉這段 Node 執行程序
// //     })
// //     .catch((err) => console.log(err));
// // })
// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER.name,
//       email: SEED_USER.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
//       return Promise.all(
//         Array.from({ length: seedRecord.length }, (_, i) =>
//           Record.create({
//             name: seedRecord[i].name,
//             category: seedRecord[i].category,
//             date: seedRecord[i].date,
//             amount: seedRecord[i].amount,
//             userId
//           })
//         )
//       )
//     })
//     .then(() => {
//       console.log('Record seeder is done!')
//       process.exit() //關閉這段 Node 執行程序
//     })
//     .catch((err) => console.error(err))
// })

const db = require('../../config/mongoose.js')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const seedRecord = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-07-23',
    amount: 60,

  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-08-23',
    amount: 60,

  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021-08-23',
    amount: 120,

  },
  {
    name: '電影-驚奇隊長',
    category: '休閒娛樂',
    date: '2021-07-23',
    amount: 120,

  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021-06-23',
    amount: 25000,

  }
]
const seedUser = {
  name: 'user1',
  email: 'user1@example.com',
  password: '123'
}

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
