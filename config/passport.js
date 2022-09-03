const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./../models/users')
const bcrypt = require('bcrypt')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false,  req.flash('warning_msg', '此信箱未註冊'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, req.flash('warning_msg', '信箱或密碼不正確'))
            return done(null, user)
          })
      })
      .catch(err => done(err))
  }))
  
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}