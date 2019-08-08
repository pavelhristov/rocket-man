import { randomFromInterval } from './helpers.js';

/**
 * @classdesc allows for usage of timers.
 * @access public
 */
export default class Timer {
    constructor() {
        this._timers = {};
    }

    /**
     * Stop the specified timer. Stops all timers if no name has been provided.
     * 
     * @access public
     * 
     * @param {string} [name] name of the timer to stop
     */
    stop(name) {
        if (name) {
            this._clearTimer(name);
            return;
        }

        for (const key in this.timers) {
            this._clearTimer(key);
        }
    }

    /**
     * Stops and clears timer.
     * 
     * @access protected
     * 
     * @param {string} name name of the timer to clear 
     */
    _clearTimer(name) {
        if (this.timers[name]) {
            clearTimeout(this.timers[name]);
            this.timers[name] = 0;
        }

        delete this.timers[name];
    }

    /**
     * Creates a timer that will execute the provided function after random seconds in the provided range.
     * 
     * @access public
     * 
     * @param {number} min minimum delay before execution in seconds
     * @param {number} max maximum delay before execution in seconds
     * @param {string} name name for timer to allow cancelation
     * @param {function} callback callback to execute after elpased time
     */
    setTimer(min, max, name, callback) {
        // aleternatively can be done async loops or coroutines
        let delay = randomFromInterval(min, max);
        this._timers[name] = setTimeout(() => {
            callback();
            this.setTimer(min, max, name, callback);
        }, delay * 1000);
    }
}