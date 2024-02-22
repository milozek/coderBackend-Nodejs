import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as SocketIO } from 'socket.io'
import handlebars from 'express-handlebars'
import mainRouter from './routes/main.router.js'
import { __dirname } from './utils.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

// * NUEVO: Se utiliza el servicio del modulo HTTP para iniciar el servidor, en vez del metodo listen de express
const httpServer = HTTPServer(app)

// * wrapper socket.io para el servicio de http
const socketServer = new SocketIO(httpServer)

const PORT = 8080

app.use((req, res, next) => {
    req.io = socketServer
    next()
})

app.use((error, req, res, next) => {
    const message = `Unknown error ${error.message}`
    console.error(message)
    res.status(500).json({ message })
})

app.use('/', mainRouter)

// * Metodos socket
socketServer.on('connection', (socketClient) => {
    console.log(`cliente se ha conectado, ID ${socketClient.id}`)

    socketClient.emit('saludo', 'hola')
    socketClient.on('saludoserver', (data) => {
        console.log(`mensaje del cliente: ${data}`)
    })
    socketClient.on('zumbido', (mensaje) => {
        console.log('emitiendo..')
        // * todos menos el cliente que envia
        socketClient.broadcast.emit('recibirZumbido', mensaje)
        // * solo al cliente que envia
        socketClient.emit()

        socketServer.emit('recibirZumbido', {})
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
