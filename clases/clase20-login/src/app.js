import express from "express"
import handlebars from "express-handlebars"
import sessions from "express-session"
import MongoStore from "connect-mongo"
import path from "path"
import { __dirname } from "./utils.js"
import { URI } from "./db/mongodb.js"

import usersRouter from "./routers/api/users.router.js"
import sessionsRouter from "./routers/api/sessions.router.js"
import loginRouter from "./routers/views/login.router.js"

const app = express()

const SESSION_SECRET = "|7@3BBY5jH:@zFQIg_v47HkKP5S#p&Uc"

app.use(
    sessions({
        store: MongoStore.create({
            mongoUrl: URI,
            mongoOptions: {},
            ttl: 60 * 30,
        }),
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))
app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use("/", loginRouter)
app.use("/api", usersRouter, sessionsRouter)

app.use((error, req, res, next) => {
    const message = `Ah ocurrido un error desconocido 😨: ${error.message}`
    console.log(message)
    res.status(500).json({ status: "error", message })
})

export default app
