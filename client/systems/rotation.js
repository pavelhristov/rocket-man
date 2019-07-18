import vec2 from '../math/vec2.js';

export class RotationSytem {
    lookAt(transform, target) {
        let direction = new vec2({ x: transform.x, y: transform.y }, target);
        let rotation = vec2.normalY().negate().angleTo(direction);
        transform.rotation = rotation;
    }
}