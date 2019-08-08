/**
 * Collision System
 * @class
 * @method checkEntity
 */
export default class Collision {
    /**
     * Checks entity against porvided collision entities
     * 
     * @param {Entity} entity entity
     * @param {Array<Entity>} colliders entities to check for collision
     */
    checkEntity(entity, colliders) {
        if (typeof entity.onCollision !== 'function') {
            return;
        }

        let p1 = {
            y: entity.y - (entity.displayObject ? (entity.displayObject.anchor.y - 0.5) * entity.displayObject.height : 0),
            x: entity.x - (entity.displayObject ? (entity.displayObject.anchor.x - 0.5) * entity.displayObject.width : 0)
        };

        colliders.forEach(e => {
            let p2 = {
                y: e.y - (e.displayObject ? (e.displayObject.anchor.y - 0.5) * e.displayObject.height : 0),
                x: e.x - (e.displayObject ? (e.displayObject.anchor.x - 0.5) * e.displayObject.width : 0)
            };

            if (this._checkCircles(p1.x - p2.x, p1.y - p2.y, entity.displayObject.width / 2, e.displayObject.width / 2)) {
                entity.onCollision(e);
            }
        });
    }

    _checkCircles(vx, vy, r1, r2) {
        let radii = r1 + r2;
        let distance = Math.sqrt(vx * vx + vy * vy);
        return distance <= radii;
    }
}
