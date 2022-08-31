const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes/index')

const app = express()

const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {console.log(`app is on localhost:${port}`)})