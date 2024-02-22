import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/users', (req, res) => {
    const { query } = req
    res.json(query)
})

/*app.get('/users', (req, res) => {
    res.json(users)
})
app.get('/users/:userId', (req, res) => {
    const { userId } = req.params
    const user = users.find((u) => u.id === parseInt(userId))
    res.json(user)
})*/

/*
app.get('/welcome/:firstName', (req, res) => {
    const { firstName } = req.params
    res.send(`welcome ${firstName}`)
})
app.get('/welcome/:firstName/:lastName', (req, res) => {
    const { firstName, lastName } = req.params

    res.send(`welcome ${firstName} ${lastName}`)
})
*/

app.listen(8081, () => {
    console.log('listening at port 8081')
})

const users = [
    {
        id: 1,
        name: 'john',
        lastname: 'karl',
        age: 34,
        course: ['node', 'react'],
    },
    {
        id: 2,
        name: 'john',
        lastname: 'karl',
        age: 34,
        course: ['node', 'react'],
    },
    {
        id: 3,
        name: 'john',
        lastname: 'karl',
        age: 34,
        course: ['node', 'react'],
    },
    {
        id: 4,
        name: 'john',
        lastname: 'karl',
        age: 34,
        course: ['node', 'react'],
    },
]
