import winston from "winston"
import config from "../config/config.js"

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple(),
        }),
    ],
    // transports: [
    // new winston.transports.File({ filename: "./errors.log", level: error }),
    // new winston.transports.File({ filename: "./errors.log", level: warn }),
    // new winston.transports.File({ filename: "./errors.log", level: info }),
    // new winston.transports.Console({ level: "http" }),
    // new winston.transports.Console({ level: "verbose" }),
    // ],
})

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "white",
        debug: "blue",
    },
}

export const addLogger = (req, res, next) => {
    config.env === "production" ? prodLogger : devLogger
    // req.logger = logger
    // req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    // next()
    next()
}
export const devLogger = (req, res, next) => {
    // transports: [new winston.transports.Console({ level: "verbose" })]

    req.logger = logger
    req.logger.verbose()
    next()
}
export const prodLogger = (req, res, next) => {
    // transports: [
    //     new winston.transports.Console({ level: "http" }),
    //     new winston.transports.File({ filename: "./errors.log", level: "warn" }),
    // ]

    req.logger = logger
    req.logger.http()
    req.logger.warn()
    next()
}
