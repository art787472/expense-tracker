const Expenses = require('./../expenses')
const Users = require('./../users')
const db = require('../../config/mongoose')
const bcrypt =require('bcrypt')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: '12345678',
}

const SEED_EXPENSES = [
  {
    name: '午餐',
    date: '2022-4-23',
    amount: 60,
    categoryId: 4
  },
  {
    name: '晚餐',
    date: '2022-4-23',
    amount: 60,
    categoryId: 4
  },
  {
    name: '捷運',
    date: '2022-4-24',
    amount: 120,
    categoryId: 2
  }, 
  {
    name: '租金',
    date: '2022-4-1',
    amount: 25000,
    categoryId: 1
  }, 
  {
    name: '電影',
    date: '2022-4-23',
    amount: 60,
    categoryId: 3
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  return  bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => Users.create({
                    ...SEED_USER,
                    password: hash
      }))
      .then(user => Promise.all(Array.from({ length: SEED_EXPENSES.length}, (_, i) => Expenses.create({ ...SEED_EXPENSES[i], userId: user._id }))))
      .then(seeds => {
          seeds.forEach(seed => console.log(`seed expense ${seed.name} generated`))
          process.exit()
      })
})
