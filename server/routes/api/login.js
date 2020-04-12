const express = require('express')
const mongodb = require('mongodb')

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
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbUser:dbUserPassword@cluster0-chc92.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('test').collection('users')
}

module.exports = router