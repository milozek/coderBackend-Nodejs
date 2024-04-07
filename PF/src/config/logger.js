import winston from "winston";

import config from "./config.js";

const customLogger = {
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
    info: "blue",
    debug: "white",
  },
};

export const devLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLogger.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errorsDev.log",
      level: "debug",
      format: winston.format.simple(),
    }),
  ],
});

export const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./errors.log", level: "warn" }),
  ],
});

export const logger = config.env === "production" ? prodLogger : devLogger;

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};
