import { uuidv4 } from '../../utils/helpers.js';

/**
 * Base entity class
 * @class
 */
export default class Entity {
    constructor(displayObject, x = 0, y = 0) {
        this.displayObject = displayObject;
        this.x = x;
        this.y = y;
        this._id = uuidv4();
    }

    //----------------------------------------------------------------------
    // properties

    get x() { return this._x; }
    set x(value) { this._x = value; this._propertyChanged('x'); }

    get y() { return this._y; }
    set y(value) { this._y = value; this._propertyChanged('y'); }

    get id() { return this._id; }

    get position() { return { x: this.x, y: this.y }; }

    /**
     * @param {function} value  callback that will be called when entity is destroyed.
     */
    set ondestroy(value) { this._ondestroy = value; }

    //----------------------------------------------------------------------
    // methods

    _propertyChanged(name) {
        if (!this.displayObject) return;
        this.displayObject[name] = this[name];
    }

    update(delta) { }

    destroy() {
        if (typeof this._ondestroy === 'function') {
            this._ondestroy();
        }
    }
}
