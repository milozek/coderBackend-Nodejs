import express from "express"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser"
import passport from "passport"
import path from "path"
import cors from "cors"
import { addLogger } from "./utils/logger.js"

// artillery || JMeter + BlazeMeter

import indexRouter from "./routers/views/index.router.js"
import usersRouter from "./routers/api/users.router.js"
import ordersRouter from "./routers/api/orders.router.js"
import businessRouter from "./routers/api/business.router.js"
import authRouter from "./routers/api/auth.router.js"
import { init as initPassport } from "./config/passport.config.js"
import { __dirname } from "./utils.js"
import config from "./config/config.js"

const app = express()

const corsOptions = {
    origin: "http://localhost:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

app.use(addLogger)
app.use(cors(corsOptions))
app.use(cookieParser(config.cookieSecret))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")))
app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "handlebars")

initPassport()
app.use(passport.initialize())

app.use("/", indexRouter)
app.use("/api", authRouter, usersRouter, ordersRouter, businessRouter)

app.use((error, req, res, next) => {
    const message = `Unknown error ${error.message}`
    console.log(message)
    res.status(500).json({ status: "error", message })
})

export default app
