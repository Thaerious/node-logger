import Logger from "@thaerious/logger";

Logger.instance.channel("log").addHandler((value, raw) => {
    console.log("prefix"
});
const logger = Logger.instance.all();

logger.log("hello world");
logger.verbose("hello there world I am logger");



