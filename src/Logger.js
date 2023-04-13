import Channel from "./Channel.js";

/**
 * Use logger.getChannel('name').log('message') instead of console.log('message')
 * Turn off a channel with logger.getChannel('name').enabled = false
 * Turn on a channel with logger.getChannel('name').enabled = true
 */
class Logger {
    constructor() {
        this.channels = {
            "log": new Channel()
        }

        return new Proxy(this, {
            get(target, prop, receiver) {
                const channel = target.channel(prop);
                return new Proxy(() => { }, new ChannelProxy(channel));
            }            
        });
    }

    static get instance() {
        return Logger.logger = Logger.logger ?? new Logger();
    }

    /**
     * Retrieve a logging channel by name.
     * Creates the channel if it hasnt' been accessed before.
     **/
    channel(name) {
        name = name ?? "log";
        if (!this.channels[name]) this.channels[name] = new Channel();
        return this.channels[name];
    }
}

class ChannelProxy {
    constructor(channel) {
        this.channel = channel;
    }

    get(target, prop, receiver) {
        return this.channel[prop];
    }

    set(obj, prop, value) {
        this.channel[prop] = value;
        return true;
    }

    apply(target, that, args) {
        return this.channel.log(...args);
    }
}


export default Logger;