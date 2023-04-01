// 載入 express 並建構應用程式伺服器
const express = require('express') //載入 express
const mongoose = require('mongoose') // 載入 mongoose
// require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const Record = require('./models/record') // 載入 Record model


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find() // 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

// new record page
app.get('/new', (req, res) => {
  return res.render('new')
})

// create new record
app.post('/', (req, res) => {
  const { name, date, amount, categoryId } = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Record.create({ name, date, amount, categoryId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})