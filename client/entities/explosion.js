import explosionPrefab from '../prefabs/explosion.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import '../utils/typedef.js';

/**
 * Expolsion game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default function (app) {
    let explosion = explosionPrefab(app);

    let entity = {
        displayObject: explosion,
        type: DISPLAY_OBJECT_TYPE.SPRITE,
        components: {
            rigidBody: {
                type: 'circle',
                onCollision(entity) {
                    if (entity.isMonster) {
                        entity.methods.die();
                    }
                }
            }
        }
    };

    return entity;
}