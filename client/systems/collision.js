export default (function () {
    const colliders = [];

    function register(entity) {
        if (colliders.find(c => c.components.rigidBody.id === entity.components.rigidBody.id)) {
            console.log('entity has already been registered for collision', entity);
            return;
        }

        entity.components.rigidBody.id = Math.random();
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
            if (result.x < 0 && result.y < 0) {
                collidingWith.push(e);
            }
        });

        if (typeof entity.components.rigidBody.onCollision === 'function') {
            collidingWith.forEach(entity.components.rigidBody.onCollision);
        }
    }

    function check(e1, e2) {
        // TODO: calculate for circles
        let p1 = e1.displayObject.getGlobalPosition();
        p1.y = p1.y + (e1.displayObject.anchor.x - 0.5) * e1.displayObject.height / 2;
        p1.x = p1.x + (e1.displayObject.anchor.y - 0.5) * e1.displayObject.width / 2;

        let p2 = e2.displayObject.getGlobalPosition();
        p2.y = p2.y + (e2.displayObject.anchor.x - 0.5) * e2.displayObject.height / 2;
        p2.x = p2.x + (e2.displayObject.anchor.y - 0.5) * e2.displayObject.width / 2;

        let vx = p1.x - p2.x;
        let vy = p1.y - p2.y;

        let result = {
            x: Math.abs(vx) - (e1.displayObject.width / 2 + e2.displayObject.width / 2),
            y: Math.abs(vy) - (e1.displayObject.height / 2 + e2.displayObject.height / 2),
            dirx: vx / Math.abs(vx),
            diry: vy / Math.abs(vy)
        };

        return result;
    }

    return {
        register,
        remove,
        checkEntity,
        check
    };
})();
