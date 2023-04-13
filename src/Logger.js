import Channel from "./Channel.js";

class Logger {
    constructor() {
        this._channels = {}

        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop.startsWith("$")) {
                    return Reflect.get(...arguments);
                }
                else {
                    const channel = target.channel(prop);
                    return new Proxy(() => { }, new ChannelProxy(channel));
                }
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
        if (!this._channels[name]) this._channels[name] = new Channel();
        return this._channels[name];
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