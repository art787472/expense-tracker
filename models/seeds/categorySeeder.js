const Categories = require('./../categories')
const db = require('../../config/mongoose')

const categories = [
  { 
    id: 1,
    name: '家居物業'
  },
  {
    id: 2,
    name: '交通出行'
  },
  {
    id: 3,
    name: '休閒娛樂'
  },
  {
    id: 4,
    name: '餐飲食品'
  },
  {
    id: 5,
    name: '其他'
  }
]


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  return  Promise.all(Array.from({ length: categories.length}, (_, i) => Categories.create({ ...categories[i] })))
    .then(seeds => {
      seeds.forEach(seed => console.log(`${seed.id}-${seed.name} generated`))
      process.exit()
    })
   
})