import * as PIXI from 'pixi.js';
import rocketmanPrefab from '../prefabs/rocketman.js';
import aimPrefab from '../prefabs/aim.js';
import playerRocketEntity from './rocket.js';
import raindropRippleEntity from './raindrop-ripple.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import Entity from './contracts/entity.js';
import '../utils/typedef.js';

/**
 * Creates Player game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default class PlayerEntity extends Entity {
    constructor(app) {
        let player = new PIXI.Container();
        let rocketman = rocketmanPrefab(app);
        let aim = aimPrefab(app);
        aim.rotation = - Math.PI / 2;
        player.addChild(rocketman);
        player.addChild(aim);
        super(app, player, DISPLAY_OBJECT_TYPE.CONTAINER, {
            movement: {
                speed: 5,
                onstartmoving: () => rocketman.play(),
                onstopmoving: () => rocketman.gotoAndStop(0)
            },
            input: {
                mouse: {
                    left: () => {
                        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
                        this.shoot(target);
                    },
                    right: () => {
                        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
                        this.move(target);
                    }
                }
            }
        });

        this._projectiles = new PIXI.Container();
        this._interactionEffects = new PIXI.Container();

        this.children = [this._projectiles, this._interactionEffects]; // TODO: layers
    }

    /**
     * @param {vec2} target target
     */
    shoot(target) {
        let rocket = new playerRocketEntity(this._app);
        rocket.x = this.x;
        rocket.y = this.y;
        rocket.displayObject.rotation = this.displayObject.rotation;
        rocket.components.movement.target = target;
        this._projectiles.addChild(rocket.displayObject);
    }

    /**
     * @param {vec2} target target
     */
    move(target) {
        this.components.movement.target = target;
        let circle = new raindropRippleEntity(this._app);
        circle.x = target.x;
        circle.y = target.y;
        this._interactionEffects.addChild(circle.displayObject);
    }
}
