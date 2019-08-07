import vec2 from '../math/vec2.js';
import mat2 from '../math/mat2.js';
import '../utils/typedef.js';
import LoopSystem from './contracts/loop-system.js';

/**
 * System that handles the movement of the an entity.
 */
export default class MovementSystem extends LoopSystem {
    constructor() {
        super('movement');
    }

    /**
     * Updates the position of the provided PIXI.DisplayObject based on the provided component. Should be called in the game loop.
     * 
     * @param {Number} delta delta time
     * @param {Entity} entity entity
     */
    move(delta, entity) {
        let movement = entity.components.movement;
        if (!movement.target) {
            return;
        }

        if (movement.state === 'stand-still' || !movement.state) {
            movement.state = 'moving';
            movement.speed = movement.speed || 1;
            if (movement.onstartmoving) { movement.onstartmoving(); }
        }

        let path = new mat2({ x: entity.x, y: entity.y }, movement.target);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < movement.speed) {
            if (movement.onstopmoving) { movement.onstopmoving(); }
            movement.state = 'stand-still';
            delete movement.target;
        } else {
            vec2.negate(vec2.normalize(dir));
            entity.x += dir.x * movement.speed * delta;
            entity.y += dir.y * movement.speed * delta;
        }
    }

    process(delta) {
        this._entities.forEach(e => {
            this.move(delta, e);
        });
    }
}
