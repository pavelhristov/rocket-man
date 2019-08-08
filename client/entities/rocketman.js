import Moving from './base/moving.js';
import mat2 from '../math/mat2.js';

/**
 * RocketMan entity
 * @class
 */
export default class RocketMan extends Moving {
    constructor(displayObject, x, y, speed = 10, rotation = 0) {
        super(displayObject, x, y, speed, rotation);
        this.originRotation = mat2.normalY().negate();
    }

    //----------------------------------------------------------------------
    // methods

    /**
     * Rotates the entity towards the target position.
     * 
     * @param {vec2} target target position
     */
    rotate(target) {
        let direction = new mat2(this.position, target);
        this.rotation = this.originRotation.angleTo(direction);
    }
}
