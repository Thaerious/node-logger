# Node Logger

A compact NodeJS module to manage app logging.
Designed to be easy to use with minimal external dependencies.

## Installation

To install using npm:

    npm i @thaerious/logger

## Quick Start

    import Logger from "@thaerious/logger";
    const logger = Logger.instance.all();
    logger.log("hello world");
    
The default behaviour provides a single channel called 'log' which outputs to the console.

## Adding Channels

Use the #channel method to add more channels to the logger.  By default new channels output to the console.

    Logger.instance.channel("verbose");

## Disabling a Channel

Setting the **enabled** field on a channel to **false** will prevent all output from that channel.
To enable the channel set the **enabled** field to **true**.

    Logger.instance.channel("verbose").enabled = false;

## Add Custom Handlers

When a channel receives input it is sent through a chain of handlers.  The default is a single handler that outputs the input to the console verbatim.
A handler is a callback function which accepts 2 arguments: value, raw.  The **value** argument is the value returned by the last handlers.  The **raw** is the original object passed into the logger.  Note, the first handler receives the same value for both **value** and **raw**.  Handlers are added to the end of the handler chain, to add to the beginnin use the **#pushHandler** method.

    Logger.instance.channel("verbose").addHandler((value, raw)=>{
        return 'prefix> ' + value;
    });

To use a single logger for all modules:
const logger = Logger.getLogger();

Specify named channel to log on:
logger.getChannel("verbose");

Log on a given channel:
logger.getChannel("verbose").log("message");
logger.getChannel("verbose").trace("message");
logger.getChannel("verbose").warn("message");
logger.getChannel("verbose").error("message");

Turn a channel off/on:
logger.getChannel("verbose").enabled = false;
logger.getChannel("verbose").enabled = true;


How to specify a prefix to each message.

Specify a callback function with "channel.prefix(cb)"
The callback function can accept up to 3 parameters:
    callback(filename, line_number, character_offset)

example:

logger.getChannel("verbose").prefix((fn, ln, co)=>{
    return `verbose: ${fn} ${ln}:${co}`;
});
