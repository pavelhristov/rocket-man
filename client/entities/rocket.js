import rocketPrefab from '../prefabs/rocket.js';
import explosionPrefab from '../prefabs/explosion.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
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
    rocket.entity = {
        displayObject: rocket,
        type: DISPLAY_OBJECT_TYPE.SPRITE,
        components: {
            movement: {
                speed: 10,
                onstopmoving: () => {
                    let explosion = explosionPrefab(app);
                    explosion.position.set(rocket.x, rocket.y);
                    explosion.play();
                    rocket.parent.addChild(explosion);

                    delete rocket.entity;
                    rocket.gotoAndStop(0);
                    rocket.parent.removeChild(rocket);
                    rocket.destroy();
                }
            }
        }
    };

    return rocket.entity;
}