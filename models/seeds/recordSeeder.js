const Record = require('../record') // 載入 record model
const db = require('../../config/mongoose') // 載入 mongoose


// 載入 JSON
const recordList = require('../../records.json').results

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