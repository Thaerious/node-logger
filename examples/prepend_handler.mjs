import Logger from "../src/Logger.js";

// add an anonymous function and console as handlers

const logger = new Logger();

logger.log.handlers = [
    (v) => `[log] ${v}`,
    logger.log.handlers
]

logger.log("hello world");