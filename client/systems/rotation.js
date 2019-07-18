import vec2 from '../math/vec2.js';
import '../utils/typedef.js';

/**
 * System that handles the rotation of the an entity.
 */
export default class RotationSytem {
    /**
     * Rotates object towards the provided target.
     * 
     * @param {PIXI.DisplayObject} transform display object.
     * @param {Point} target target to look at.
     */
    lookAt(transform, target) {
        let direction = new vec2({ x: transform.x, y: transform.y }, target);
        let rotation = vec2.normalY().negate().angleTo(direction);
        transform.rotation = rotation;
    }
}