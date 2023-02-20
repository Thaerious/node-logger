import Logger from "@thaerious/logger";

Logger.instance.channel("verbose");
const logger = Logger.instance.all();

Logger.instance.channel("verbose").enabled = false;
logger.verbose("hello there world I am logger");
Logger.instance.channel("verbose").enabled = true;
logger.verbose("whew I can speak again!");

