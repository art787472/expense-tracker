const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

const app = express()

// set up view engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {console.log(`app is on localhost:${port}`)})