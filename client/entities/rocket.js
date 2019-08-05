import rocketPrefab from '../prefabs/rocket.js';
import ExplosionEntity from './explosion.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import collisionSystem from '../systems/collision.js';
import Entity from './contracts/entity.js';
import '../utils/typedef.js';

/**
 * Creates Rocket game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default class RocketEntity extends Entity {
    constructor(app) {
        let rocket = rocketPrefab(app);
        super(rocket, DISPLAY_OBJECT_TYPE.SPRITE);
        this._app = app;

        this.components.movement = {
            speed: 10,
            onstopmoving: this.explode.bind(this)
        };
    }

    explode() {
        let explosion = new ExplosionEntity(this._app);
        explosion.displayObject.position.set(this.x, this.y);
        explosion.displayObject.play();
        this.displayObject.parent.addChild(explosion.displayObject);
        collisionSystem.checkEntity(explosion);

        this.destroy();
    }
}
