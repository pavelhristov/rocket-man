import { uuidv4 } from './utils/helpers.js';

/**
 * @class Monster
 * @property {number} id
 * @property {number} x
 * @property {number} y
 * @property {string} type
 * @property {boolean} alive
 */
export default class Monster {
    /**
     * 
     * @param {string} type type
     * @param {number} [x=0] x
     * @param {number} [y=0] y
     * @param {string} [id] id
     * @param {function} [onChange] on change callback
     */
    constructor(type, x = 0, y = 0, id, onChange) {
        if (!type) throw new Error('type is required!');

        this._x = x;
        this._y = y;
        this._alive = true;
        this._id = id || uuidv4();
        this._type = type;
        this._onChange = onChange;
    }

    // -----------------------------------------------------------------------------
    // properties

    /**
     * @returns {number} x
     */
    get x() { return this._x; }
    /**
    * @param {number} value x
    */
    set x(value) { this._x = value; this._change(); }

    /**
     * @returns {number} y
     */
    get y() { return this._y; }
    /**
     * @param {number} value y
     */
    set y(value) { this._y = value; this._change(); }

    /**
     * @returns {boolean} alive
     */
    get alive() { return this._alive; }
    /**
     * @param {boolean} value alive
     */
    set alive(value) { this._alive = value; this._change(); }

    /**
     * @returns {string} id
     */
    get id() { return this._id; }

    /**
     * @returns {string} type
     */
    get type() { return this._type; }
    /**
     * @param {string} value type
     */
    set type(value) { this._type = value; this._change(); }

    /**
     * @param {function} value handler
     */
    set onChange(value) { this._onChange = value; }

    // -----------------------------------------------------------------------------
    // methods

    /**
     * Signals that object has changed.
     * 
     * @access private
     */
    _change() {
        if (typeof this._onChange === 'function') {
            this._onChange(this);
        }
    }
}
