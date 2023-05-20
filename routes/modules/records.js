//  引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁篩選  
router.get('/filter', async (req, res) => {
  const categories = await Category.find().lean()
  // 當選擇 Category or date為空白時，{ $ne: '' } 使後面 $match 不出錯。因為{ $ne: '' } 表示找出不等於空值的所有資料
  const inputCategory = req.query.category ? req.query.category : { $ne: '' }
  const inputDate = req.query.month ? req.query.month : { $ne: '' }
  const categoryData = {}
  const userId = req.user._id
  const filteredData = await Record.aggregate([
    { $project: { userId: 1, name: 1, amount: 1, category: 1, date: { $substr: ["$date", 0, 7] }, day: { $substr: ["$date", 7, 9] } } },
    { $match: { 'category': inputCategory, 'date': inputDate, userId } }
  ])
  // 產出 category icon 對應名字一物件，res.render中使用渲染出icon
  categories.forEach(category => categoryData[category.name] = category.icon)

  async function getFilterData() {
    try {
      if (!filteredData) return res.redirect('/')
      const records = filteredData // home.js使用records
      const date = []
      const rawRecords = await Record.find().lean()
      let totalAmount = 0
      // 在篩選欄顯示 db 中有的月份
      for (let i = 0; i < rawRecords.length; i++) {
        if (!date.includes(rawRecords[i].date.slice(0, 7))) {
          date.push(rawRecords[i].date.slice(0, 7))
        }
      }
      // 顯示篩選資料 icon/totalAmount
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }

      res.render('index', { records, categories, inputCategory, totalAmount, date, inputDate })
    } catch (error) {
      console.error(error)
    }
  }

  getFilterData()
})
// 首頁新增支出
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})

// 新增支出頁送出
router.post('/', (req, res) => {
  const record = req.body
  const userId = req.user._id
  const { name, category, date, amount, merchant } = record
  Record.create({ name, category, date, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)

    })
})

// 首頁修改資料
router.get('/:id/edit', async (req, res) => {
  const categories = await Category.find().lean()
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      const category = record.category
      res.render('edit', { record, _id, categories, category })
    })
    .catch(error => {
      console.log(error)
    })
})

// edit.hbs送出資料  
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const editedRecord = req.body
  Record.findOne({ _id, userId })
    .then(record => {
      record._id = _id
      record.name = editedRecord.name
      record.category = editedRecord.category
      record.date = editedRecord.date
      record.amount = editedRecord.amount
      record.merchant = editedRecord.merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
    })
})

// 首頁刪除資料  
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
