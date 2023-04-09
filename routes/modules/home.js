// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Record = require("../../models/record")

// 設定首頁路由
router.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose的 Model物件轉換成乾淨的JavaScript 資料陣列
    .sort({ _id: "desc" })
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      return res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router