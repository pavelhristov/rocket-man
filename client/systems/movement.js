import vec2 from '../math/vec2.js';
import mat2 from '../math/mat2.js';
import collisionSystem from './collision.js';
import '../utils/typedef.js';

/**
 * System that handles the movement of the an entity.
 */
export default (function () {
    /**
     * Updates the position of the provided PIXI.DisplayObject based on the provided component. Should be called in the game loop.
     * 
     * @param {Number} delta  delta time
     * @param {PIXI.DisplayObject} transform display object
     * @param {Object} component movement component
     */
    function move(delta, transform, component) {
        if (!component.target) {
            return;
        }

        if (component.state === 'stand-still' || !component.state) {
            component.state = 'moving';
            component.speed = component.speed || 1;
            if (component.onstartmoving) { component.onstartmoving(); }
        }

        let path = new mat2({ x: transform.x, y: transform.y }, component.target);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < component.speed) {
            if (component.onstopmoving) { component.onstopmoving(); }
            component.state = 'stand-still';
            delete component.target;
        } else {
            vec2.negate(vec2.normalize(dir));
            transform.x += dir.x * component.speed * delta;
            transform.y += dir.y * component.speed * delta;
            collisionSystem.checkEntity(transform.entity);
        }
    }

    return {
        move
    };
})();
