import rocketPrefab from '../prefabs/rocket.js';
import explosionEntity from './explosion.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import collisionSystem from '../systems/collision.js';
import '../utils/typedef.js';

/**
 * Creates Rocket game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default function (app) {
    let rocket = rocketPrefab(app);

    function explode() {
        //if(!rocket || !rocket.entity || rocket.entity.status === 'destroying') return;

        let explosion = explosionEntity(app);
        explosion.displayObject.position.set(rocket.x, rocket.y);
        explosion.displayObject.play();
        rocket.parent.addChild(explosion.displayObject);
        collisionSystem.checkEntity(explosion);

        //rocket.entity.status = 'destroying';
        delete rocket.entity;
        rocket.gotoAndStop(0);
        rocket.parent.removeChild(rocket);
        rocket.destroy();
    }

    rocket.entity = {
        displayObject: rocket,
        type: DISPLAY_OBJECT_TYPE.SPRITE,
        components: {
            movement: {
                speed: 10,
                onstopmoving: explode
            // },
            // rigidBody: {
            //     onCollision(entity) {
            //         if (entity.isMonster) {
            //             entity.methods.die();
            //             collisionSystem.remove(rocket.entity);
            //             explode();
            //         }
            //     }
            }
        }
    };

    return rocket.entity;
}