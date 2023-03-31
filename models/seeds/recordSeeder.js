const mongoose = require('mongoose') // 載入 mongoose
const Record = require('../record') // 載入 record model
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection

// 載入 JSON
const recordList = require('../../records.json').results
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
//新增資料
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(recordList)
    .catch(err => {
      console.trace(err)
    })
    .finally(() => {
      db.close()
    })
})