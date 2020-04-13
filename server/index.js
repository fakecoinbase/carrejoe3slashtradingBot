const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config/config')

const coinbase = require('coinbase')
const client = new coinbase.Client({
    'apiKey': config.COINBASE_API_KEY,
    'apiSecret': config.COINBASE_API_SECRET,
    strictSSL: false
})

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const login = require('./routes/api/users')

app.use('/api/login', login)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)

    client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) {
        console.log('total amount: ' + obj.data.amount);

        if (err) {
            console.error(err)
        }
    });
})
