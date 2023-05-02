// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId }) // 取出 Record model 裡的所有資料
    .then() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      return res.render('index', { records, totalAmount })
    }) // 將資料傳給 index 樣板
    .catch(error => console.log(error))
})

// 設定search路由
router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId
  if (id === '6') {
    return res.redirect('/')
  }
  Record.find({ userId })
    .lean()
    .then(records => {
      const findRecord = records.filter(data =>
        data.categoryId === Number(categoryId))
      let totalAmount = 0
      for (let i = 0; i < findRecord.length; i++) {
        totalAmount += findRecord[i].amount
      }
      return res.render('index', { records: findRecord, categoryId, totalAmount })
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router