const express = require('express')
const mongodb = require('mongodb')
const config = require('../../config/config')

const router = express.Router()

// Get users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection()
    res.send(await users.find({}).toArray())
})

// Add user

router.post('/', async (req, res) => {
    const users = await loadUsersCollection()

    await users.insertOne({
        username: req.body.username,
        password: req.body.password,
        createdAt: new Date()
    })

    res.status(201).send()
})

// Delete user

router.delete('/:id', async (req, res) => {
    const users = await loadUsersCollection()

    await users.deleteOne({ _id: new mongodb.objectID(req.params.id) })

    res.status(200).send()
})

async function loadUsersCollection () {
    const client = await mongodb.MongoClient.connect(config.MONGO_URL, {
        useNewUrlParser: true
    })

    return client.db(config.MONGO_DATABASE_NAME).collection('users')
}

module.exports = router