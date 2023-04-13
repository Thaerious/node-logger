/**
 * Uses a chain of handlers to format a log string.
 * The default handler outputs to console.
 * If enabled is set to false, no processing occurs.
 */
export class Channel {
    constructor() {
        this._enabled = true;        
        this.handlers = [console];
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    /**
     * Remove all handlers from this channel.
     * Calling this method will also remove the default handler.
     */
    clearHandlers() {
        this._handlers = [];
    }

    get handlers() {
        return [...this._handlers];
    }

    set handlers(handlers) {
        this._handlers = [];
        
        for (const hnd of handlers.flat()) {
            this.appendHnd(hnd);
        }        
    }

    /**
     * Adds a handler to this channel.  This new handler will be called
     * after all previously added handlers.  
     * 
     * The handler signature is:
     *     handler(value, raw) : string
     * 
     * value : is the currently formatted line that will be output.
     * raw : is the original input string.
     * 
     * The returned string will be passed to the next handler's value parameter.
     */
    appendHnd(handler) {
        if (typeof handler === "function") {
            this._handlers.push(handler);
        }
        else if (handler?.log) {
            this._handlers.push((v, r) => handler.log(v));
        }
    }

    /**
     * Adds a handler to this channel.  This new handler will be called
     * before all previously added handlers (see #addHandler).
     */    
    prependHnd(handler) {
        if (typeof handler === "function") {
            this._handlers.unshift(handler);
        }
        else if (handler?.log) {
            this._handlers.unshift((v, r) => handler.log(v));
        }
    }

    log(value) {
        if (!this.enabled) return;
        
        let current = value;
        console.log(this._handlers);
        for (const handler of this._handlers) {
            current = handler(current, value);
        }
    }
}

export default Channel;

