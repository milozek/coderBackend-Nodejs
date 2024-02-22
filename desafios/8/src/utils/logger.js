import winston from "winston"

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
        error: "orange",
        warning: "yellow",
        info: "blue",
        debug: "white",
    },
}

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
    next()
}
export const devLogger = (req, res, next) => {
    req.logger = logger
    req.logger.verbose()
    next()
}
export const prodLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http()
    req.logger.warn()
    next()
}
