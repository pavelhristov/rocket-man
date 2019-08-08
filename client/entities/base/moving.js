import Entity from './entity.js';
import mat2 from '../../math/mat2';
import vec2 from '../../math/vec2';

/**
 * Entity that defines movement functionality
 * @class
 * @extends Entity
 */
export default class Moving extends Entity {
    constructor(displayObject, x, y, speed = 10, rotation = 0) {
        super(displayObject, x, y);
        this.rotation = rotation;
        this.speed = speed;
        this._state = 'stopped';
    }

    //----------------------------------------------------------------------
    // properties

    get rotation() { return this._rotation; }
    set rotation(value) { this._rotation = value; this._propertyChanged('rotation'); }

    get moveTarget() { return this._moveTarget; }
    /**
     * @param {vec2} value movement target destination.
     */
    set moveTarget(value) {
        this._moveTarget = value;
        this._state = value ? 'moving' : 'stopped';
        this._propertyChanged('_state');
    }

    /**
     * @param {function} value callback that will be called when entity stopes moving.
     */
    set onStopMoving(value) {
        if (typeof value !== 'function') throw new TypeError('onStopMoving must be a function!');
        this._onStopMoving = value;
    }

    //----------------------------------------------------------------------
    // overrides

    _propertyChanged(name) {
        if (!this.displayObject) return;
        if (name === '_state') {
            if (this._state === 'moving' && typeof this.displayObject.play === 'function') {
                this.displayObject.play();
            } else if (this._state === 'stopped' && typeof this.displayObject.gotoAndStop === 'function') {
                this.displayObject.gotoAndStop(0);
            }

            return;
        }

        super._propertyChanged(name);
    }

    update(delta) {
        this.move(delta);
    }

    //----------------------------------------------------------------------
    // methods

    /**
     * Moves the entity, should be called inside the game loop
     * 
     * @param {number} delta delta time
     */
    move(delta) {
        if (!this.moveTarget) return;

        let path = new mat2(this.position, this.moveTarget);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < this.speed) {
            this.x = this.moveTarget.x;
            this.y = this.moveTarget.y;
            this.moveTarget = undefined;
            if (typeof this._onStopMoving === 'function') this._onStopMoving(this);
        } else {
            vec2.negate(vec2.normalize(dir));
            this.x += dir.x * this.speed * delta;
            this.y += dir.y * this.speed * delta;
        }
    }
}