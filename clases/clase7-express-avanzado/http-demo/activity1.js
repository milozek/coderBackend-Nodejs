import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('')
})

app.get('/welcome', (req, res) => {
    const htmlText = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p style="color: red">we welcome u to our webpage</p>
    </body>
    </html>`
    res.send(htmlText)
})

app.get('/users', (req, res) => {
    const user = {
        name: 'john',
        lastname: 'karl',
        age: 34,
        course: ['node', 'react'],
    }
    res.send(user)
})

app.listen(8080, () => {
    console.log('listening on 8080')
})
