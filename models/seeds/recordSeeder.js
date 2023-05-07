// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require("bcryptjs") // 載入 bcryptjs model
const Record = require('../record') // 載入 record model
const db = require('../../config/mongoose') // 載入 mongoose
const User = require("../user") // 載入 user

//把「兩個使用者」的資料定義成 SEED_USER 物件
const SEED_USER = [{
  name: '廣志',
  email: 'user1@test.com',
  password: '12345678',
  recordIndex: [0, 2, 4]
},
{
  name: '小新',
  email: 'user2@test.com',
  password: '12345678',
  recordIndex: [1, 3]
}
];

//把5筆的資料定義成 SEED_Record 物件
const SEED_Record = [
  {
    name: "午餐",
    date: "2019-04-23",
    amount: 60,
    categoryId: 4
  },
  {
    name: "晚餐",
    date: "2019-04-23",
    amount: 60,
    categoryId: 3
  },
  {
    name: "捷運",
    date: "2019-04-23",
    amount: 120,
    categoryId: 2
  },
  {
    name: "電影：驚奇隊長",
    date: "2019-04-23",
    amount: 220,
    categoryId: "3"
  },
  {
    name: "租金",
    date: "2015-04-01",
    amount: 25000,
    categoryId: 1
  }
]


//新增資料
db.once("open", () => {
  return Promise.all(
    SEED_USER.map((user) => {
      const { name, email, password, recordIndex } = user
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      })
        .then((user) => {
          const userId = user._id;
          const records = recordIndex.map((index) => {
            return { ...SEED_Record[index], userId };
          });
          return Record.create(records);
        });
    })
  )
    .then(() => {
      console.log("Record seeder is done!")
      process.exit() //關閉這段 Node 執行程序
    })
})

