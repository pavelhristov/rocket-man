import mat2 from '../math/mat2.js';
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
        let direction = new mat2({ x: transform.x, y: transform.y }, target);
        let rotation = mat2.normalY().negate().angleTo(direction);
        transform.rotation = rotation;
    }
}