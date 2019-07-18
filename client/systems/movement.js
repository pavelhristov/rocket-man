import vec2 from '../math/vec2.js';

export default class MovementSystem {
    move(delta, transform, component) {
        if (!component.target) {
            return;
        }

        if (component.state === 'stand-still' || !component.state) {
            component.state = 'moving';
            component.speed = component.speed || 1;
            if (component.onstartmoving) { component.onstartmoving(); }
        }

        let path = new vec2({ x: transform.x, y: transform.y }, component.target);
        let dir = path.getDirection();
        if (Math.sqrt(dir.x * dir.x + dir.y * dir.y) < component.speed) {
            if (component.onstopmoving) { component.onstopmoving(); }
            component.state = 'stand-still';
            delete component.target;
        } else {
            vec2.negate(vec2.normalize(dir));
            transform.x += dir.x * component.speed * delta;
            transform.y += dir.y * component.speed * delta;
        }
    }
}
