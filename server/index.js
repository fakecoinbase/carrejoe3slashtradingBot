const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const coinbase = require('coinbase')
const config = require('./config/config')
const client = new coinbase.Client({ 'apiKey': config.COINBASE_API_KEY, 'apiSecret': config.COINBASE_API_SECRET })
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const login = require('./routes/api/login')

app.use('/api/login', login)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
