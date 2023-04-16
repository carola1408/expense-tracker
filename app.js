// 載入 express 並建構應用程式伺服器
const express = require('express') //載入 express
const session = require('express-session') // 載入 session
// require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') // 引用 body-parser
const Category = require('./models/category')
const methodOverride = require('method-override')  // 載入 method-override
const flash = require('connect-flash')  // 引用connect-flash


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引用路由器
const routes = require('./routes')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT


// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
// 掛載flash套件
app.use(flash())

app.use((req, res, next) => {
  // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
  res.locals.isAuthenticated = req.isAuthenticated()
  // 反序列化時取得的 user 資訊
  res.locals.user = req.user
  // 設定 success_msg 訊息
  res.locals.success_msg = req.flash('success_msg')
  // 設定 warning_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// 將 request 導入路由器
app.use(routes)


// 設定 port 3000
app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})