const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy // 載入 Strategy
// 引用 bcryptjs model
const bcrypt = require('bcryptjs')
const User = require('../models/user') // 載入 User model

//透過 module.exports 輸出一個 function
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { type: 'warning_msg', message: '此信箱未被註冊!' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { type: 'warning_msg', message: '信箱或密碼不正確!' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean() //把資料庫物件轉換成 JavaScript 原生物件
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}