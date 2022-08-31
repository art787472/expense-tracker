const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.end('expense tracker'))

app.listen(port, () => {console.log(`app is on localhost:${port}`)})