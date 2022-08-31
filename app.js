const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
require('./config/mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

// set up hbs dateformat helper
const hbs = exphbs.create({ defaultLayout: 'main', 
                            extname: '.hbs',
                            helpers: {
                              dateFormat (date) { return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` 
                            }
                            }
                          })

// set up template engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')



// setting file location for static files
app.use(express.static('public'))

// set up body parser
app.use(bodyParser.urlencoded({ extended: true }))


const port = process.env.PORT || 3000

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {console.log(`app is on localhost:${port}`)})