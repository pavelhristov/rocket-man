import { randomFromInterval } from './utils/helpers.js';

/**
 * @abstract ATimer
 * @classdesc allows for usage of timers.
 * @access public
 */
export default class ATimer {
    constructor() {
        if (new.target === ATimer) throw new TypeError('Cannot construct abstract class "Timer" instances directly');

        this._timers = {};
    }

    /**
     * @abstract
     * has to be implemented by inheriting class.
     * 
     * @access public
     */
    start() {
        throw new Error('Not Implemented!');
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
     * @access protected
     * 
     * @param {number} min minimum delay before execution in seconds
     * @param {number} max maximum delay before execution in seconds
     * @param {string} name name for timer to allow cancelation
     * @param {function} callback callback to execute after elpased time
     */
    _setTimer(min, max, name, callback) {
        // aleternatively can be done async loops or coroutines
        let delay = randomFromInterval(min, max);
        this._timers[name] = setTimeout(callback, delay * 1000);
    }
}