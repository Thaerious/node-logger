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
    logger.log.enabled = true;
```
    
## Add Custom Handlers
When a channel receives input it is sent through a chain of handlers.  The default is a single handler that outputs the input to the console verbatim.

A handler can either be a callback function or an object with a **log** function, such as console or another channel.

The callback function accepts 2 arguments: value, raw.  The **value** argument is the value returned by the previous handler.  The **raw** is the original object value into the channel.  Note, the first handler receives the same value for both **value** and **raw**.  The channel will return the result of the last handler.

Pass an array of handlers to **handlers** setter to set handlers, this will erase all previous handlers.  Alternatively use **#clearHandlers**, **prependHandler**, or **appendHandler**.

```js
logger.log.handlers = [
    (v) => `[log] ${v}`,
    someHandler,
    console
]
```

To prepend handlers, pass in the previous handlers.

```js
logger.log.handlers = [
    (v) => `[log] ${v}`,
    someHandler,
    this.handlers
]
```