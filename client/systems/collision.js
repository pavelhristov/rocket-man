import { uuidv4 } from '../utils/helpers.js';

export default (function () {
    const colliders = [];

    function register(entity) {
        if (colliders.find(c => c.components.rigidBody.id === entity.components.rigidBody.id)) {
            console.log('entity has already been registered for collision', entity);
            return;
        }

        entity.components.rigidBody.id = uuidv4();
        colliders.push(entity);
    }

    function remove(entity) {
        let index = colliders.indexOf(entity);
        if (index > -1) {
            colliders.splice(index, 1);
        }
    }

    function checkEntity(entity) {
        if (!entity.components.rigidBody) {
            return;
        }

        let collidingWith = [];
        colliders.forEach(e => {
            if (e.components.rigidBody.id === entity.components.rigidBody.id) {
                return;
            }

            let result = check(entity, e);
            if (result.collision) {
                collidingWith.push(e);
            }
        });

        if (typeof entity.components.rigidBody.onCollision === 'function') {
            collidingWith.forEach(entity.components.rigidBody.onCollision);
        }
    }

    function check(e1, e2) {

        let p1 = e1.displayObject.getGlobalPosition();
        p1.y -= (e1.displayObject.anchor.y - 0.5) * e1.displayObject.height;
        p1.x -= (e1.displayObject.anchor.x - 0.5) * e1.displayObject.width;

        let p2 = e2.displayObject.getGlobalPosition();
        p2.y -= (e2.displayObject.anchor.y - 0.5) * e2.displayObject.height;
        p2.x -= (e2.displayObject.anchor.x - 0.5) * e2.displayObject.width;

        let vx = p1.x - p2.x;
        let vy = p1.y - p2.y;

        if (e1.components.rigidBody.type === 'circle' && e2.components.rigidBody.type === 'circle') {
            return checkCircles(vx, vy, e1.displayObject.width / 2, e2.displayObject.width / 2);
        }

        return checkRectangles(vx, vy, e1.displayObject.width / 2 + e2.displayObject.width / 2,
            e1.displayObject.height / 2 + e2.displayObject.height / 2);
    }

    function checkRectangles(vx, vy, combinedHalfWidth, combinedHalfHeight) {
        let x = Math.abs(vx) - combinedHalfWidth;
        let y = Math.abs(vy) - combinedHalfHeight;

        let result = {
            collision: x < 0 && y < 0,
            x, y,
            dirx: Math.sign(vx),
            diry: Math.sign(vy)
        };

        return result;
    }

    function checkCircles(vx, vy, r1, r2) {
        let radii = r1 + r2;
        let distance = Math.sqrt(vx * vx + vy * vy);
        if (distance > radii) { // No Collision. No Obstruction. No Nothing.
            return {
                x: 1,
                y: 1,
                dirx: Math.sign(vx),
                diry: Math.sign(vy)
            };
        }

        let margin = radii - distance;
        let angle = Math.atan2(vy, vx) * 180 / Math.PI;

        return {
            collision: true,
            x: margin * Math.cos(angle),
            y: margin * Math.sin(angle),
            dirx: Math.sign(vx),
            diry: Math.sign(vy)
        };
    }

    // TODO: circle and rectangle

    return {
        register,
        remove,
        checkEntity,
        check
    };
})();
