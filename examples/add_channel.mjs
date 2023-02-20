import Logger from "@thaerious/logger";

Logger.instance.channel("verbose");
const logger = Logger.instance.all();

logger.log("hello world");
logger.verbose("hello there world I am logger");


