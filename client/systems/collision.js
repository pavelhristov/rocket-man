import BaseSystem from './contracts/base-system.js';

export default class CollisionSystem extends BaseSystem {
    constructor() {
        super('rigidBody');
    }

    /**
     * Checks entity against all registered for collision entities
     * 
     * @param {Entity} entity entity
     */
    checkEntity(entity) {
        if (!entity.components.rigidBody) {
            return;
        }

        let collidingWith = [];
        this._entities.forEach(e => {
            if (e.components.rigidBody.id === entity.components.rigidBody.id) {
                return;
            }

            let result = this.check(entity, e);
            if (result.collision) {
                collidingWith.push(e);
            }
        });

        if (typeof entity.components.rigidBody.onCollision === 'function') {
            collidingWith.forEach(entity.components.rigidBody.onCollision);
        }
    }

    /**
     * Checks entities for collision. If entities dont have riggidBody only box collision will be used.
     * 
     * @param {Entity} e1 entity
     * @param {Entity} e2 entity
     * 
     * @return {Object} collision
     */
    check(e1, e2) {
        if (e1.status === 'destroying' || e2.status === 'destroying') return { collision: false };
        let p1 = e1.displayObject.getGlobalPosition();
        p1.y -= (e1.displayObject.anchor.y - 0.5) * e1.displayObject.height;
        p1.x -= (e1.displayObject.anchor.x - 0.5) * e1.displayObject.width;

        let p2 = e2.displayObject.getGlobalPosition();
        p2.y -= (e2.displayObject.anchor.y - 0.5) * e2.displayObject.height;
        p2.x -= (e2.displayObject.anchor.x - 0.5) * e2.displayObject.width;

        let vx = p1.x - p2.x;
        let vy = p1.y - p2.y;

        if (e1.components.rigidBody && e2.components.rigidBody &&
            e1.components.rigidBody.type === 'circle' && e2.components.rigidBody.type === 'circle') {
            return this._checkCircles(vx, vy, e1.displayObject.width / 2, e2.displayObject.width / 2);
        }

        return this._checkRectangles(vx, vy, e1.displayObject.width / 2 + e2.displayObject.width / 2,
            e1.displayObject.height / 2 + e2.displayObject.height / 2);
    }

    _checkRectangles(vx, vy, combinedHalfWidth, combinedHalfHeight) {
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

    _checkCircles(vx, vy, r1, r2) {
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
}
