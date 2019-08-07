import explosionPrefab from '../prefabs/explosion.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import Entity from './contracts/entity.js';
import MonsterEntity from './monster.js';
import '../utils/typedef.js';

/**
 * Expolsion game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default class ExpolsionEntity extends Entity {
    constructor(app) {
        let explosion = explosionPrefab(app);
        super(app, explosion, DISPLAY_OBJECT_TYPE.SPRITE, {
            rigidBody: {
                type: 'circle',
                onCollision(entity) {
                    if (entity instanceof MonsterEntity && entity.alive) {
                        entity.alive = false;
                    }
                }
            }
        });

        explosion.onComplete = () => this.destroy();
    }
}