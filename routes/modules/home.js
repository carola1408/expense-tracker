// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Record = require('../../models/record')
const Category = require('../../models/category')


// 設定首頁路由
router.get('/', (req, res) => {
  const categories = []
  const userId = req.user._id

  // 取出 categoryId 裡的所有資料
  const categoryId = Number(req.query.sortByCategory)

  // 取出 categoryId 裡的所有資料或前端傳回來的categoryId
  const filter = categoryId ? { userId, categoryId } : { userId }

  // 先把所有的category找出來再放到categories陣列，最後再傳回前端
  Category.find()
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    // 將類別依Category.id去作升冪排列
    .sort({ _id: 'asc' })
    .then(category => categories.push(...category))
    .then(() => {
      Record.find(filter) // 取出 Record model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ date: "desc" })
        .then((records) => {
          let totalAmount = 0
          records.forEach((record) => {
            totalAmount += record.amount
            record.date = record.date.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })
          })
          res.render("index", { records, totalAmount, categories, categoryId }) // 將資料傳給 index 樣板
        })
    })
    .catch(error => console.error(error)) // 錯誤處理
})

//匯出路由模組
module.exports = router;
