// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Category = require('../../models/category')
const Record = require('../../models/record')

// 設定首頁路由
router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)

  async function getAllData() {
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    try {
      let totalAmount = 0
      const date = []

      for (let i = 0; i < records.length; i++) {
        if (!date.includes(records[i].date.slice(0, 7))) {
          date.push(records[i].date.slice(0, 7))
        }
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }

      res.render('index', { records, categories, totalAmount, date })
    } catch (error) {
      console.error(error)

    }
  }

  getAllData()
})
//匯出路由模組
module.exports = router
