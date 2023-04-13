# Node Logger
A compact NodeJS module to manage application logging.
Designed to be easy to use with minimal (currently none) external dependencies.

## Installation
To install using npm:

```bash
    npm i @thaerious/logger
```

## Quick Start
The default behaviour provides a single channel called 'log' which outputs to the console.
Inovking the channel as a function will process the passed in values.

```js
    import Logger from "@thaerious/logger";
    const logger = new Logger();
    logger.log("hello world");
```  

## Adding Channels
Using a previously undefined channedl will create a new channel that outputs to the console.

```js
    logger.verbose("ima debug statement!");
```

## Disabling a Channel
Setting the **enabled** field on a channel to **false** will prevent all processing on that channel.
To enable the channel set the **enabled** field to **true**.

``` js
    logger.log.enabled = false;
```
    
## Add Custom Handlers
When a channel receives input it is sent through a chain of handlers.  The default is a single handler that outputs the input to the console verbatim.

A handler can either be a callback function or an object with a **log** function, such as console or another channel.

The callback function accepts 2 arguments: value, raw.  The **value** argument is the value returned by the previous handler.  The **raw** is the original object value into the channel.  Note, the first handler receives the same value for both **value** and **raw**.  The channel will return the result of the last handler.

Use the **handlers** setter to set handlers, this will erase all previous handlers.  Alternatively use **#clearHandlers**, **prependHandler**, or **appendHandler**.

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
