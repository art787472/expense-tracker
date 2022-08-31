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

// setting file location for static files
app.use(express.static('public'))



const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {console.log(`app is on localhost:${port}`)})