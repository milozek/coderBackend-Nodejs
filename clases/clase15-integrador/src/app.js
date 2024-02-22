import express from "express"
import handlebars from "express-handlebars"

import { __dirname } from "./utils.js"
import indexRouter from "./routers/views/index.router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.engine("handlebars", handlebars.engine)
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")

app.use((error, req, res, next) => {
    const message = `unexpected error: ${error.message}`
    console.error(message)
    res.status(500).send({ message })
})

app.use("/", indexRouter)

export default app
