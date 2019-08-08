/**
 * Simple abstraction over dom events.
 */
export default class Input {
    /**
     * @param {HTMLCanvasElement} view render element
     */
    constructor(view) {
        this._view = view;
        this._documentEvents = {};
        this._canvasEvents = {};
        this._state = { mousein: true };
    }

    //----------------------------------------------------------------------
    // properties

    get state() { return this._state; }

    //----------------------------------------------------------------------
    // methods

    /**
     * Bind event
     * 
     * @param {string} event event name 
     * @param {function} handler event handler
     * @param {bool} isCanvas if the event has to be registered on the canvas element instead of the document 
     */
    bindEvent(event, handler, isCanvas) {
        if (isCanvas) {
            this._canvasEvents[event] ? this._canvasEvents[event].push(handler) : this._canvasEvents[event] = [handler];
            this._view.addEventListener(event, handler);
        } else {
            this._documentEvents[event] ? this._documentEvents[event].push(handler) : this._documentEvents[event] = [handler];
            document.addEventListener(event, handler);
        }
    }

    /**
     * Unbinds all events from specified type
     * 
     * @param {string} event event name
     * @param {bool} isCanvas to unbind from canvas element instead of the document
     */
    unbindEvent(event, isCanvas) {
        if (isCanvas && this._canvasEvents[event]) {
            this._canvasEvents[event].forEach(e => this._view.removeEventListener(event, e));
            delete this._canvasEvents[event];
        } else if (this._documentEvents[event]) {
            this._documentEvents[event].forEach(e => document.removeEventListener(event, e));
            delete this._documentEvents[event];
        }
    }

    /**
     * Unbinds provided handler from specified type
     * 
     * @param {string} event event name
     * @param {function} handler event handler to unbind
     * @param {bool} isCanvas to unbind from canvas element instead of the document
     */
    unbindHandler(event, handler, isCanvas) {
        if (isCanvas && this._canvasEvents[event]) {
            this._view.removeEventListener(event, handler);
            let index = this._canvasEvents[event].indexOf(handler);
            if (index > -1) {
                this._canvasEvents[event].splice(index, 1);
            }
        } else if (this._documentEvents[event]) {
            document.removeEventListener(event, handler);
            let index = this._documentEvents[event].indexOf(handler);
            if (index > -1) {
                this._documentEvents[event].splice(index, 1);
            }
        }
    }
}
