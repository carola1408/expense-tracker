// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 設定login路由
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {

})

// 設定register路由
router.get('/register', (req, res) => {
  res.render('register')
})

// 匯出路由模組
module.exports = router