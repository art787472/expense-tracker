const express = require('express')
const router = express.Router()
const User = require('./../../models/users')
const passport = require('passport')
const bcrypt = require('bcrypt')

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '有欄位未填' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了'})
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(user => {
        req.login(user, err => {
          if (err) return next(err)
          return res.redirect('/')
        })
      })
      .catch(err => {
      console.error(err)
    })
    }
  })
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
  failureMessage: true
}))

router.get('/logout', (req, res) => {
  req.logout(() => console.log('logout'))
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router