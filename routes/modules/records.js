// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Record = require("../../models/record")

// new record page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new record
router.post('/', (req, res) => {
  const { name, date, amount, categoryId } = req.body      // 從 req.body 拿出表單裡的資料
  return Record.create({ name, date, amount, categoryId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定修改路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
// 設定Update 功能路由
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, amount, categoryId } = req.body      // 從 req.body 拿出表單裡的資料
  return Record.findById(id)
    .then(record => {
      record.set({ name, date, amount, categoryId })
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定刪除路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router