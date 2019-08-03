import * as PIXI from 'pixi.js';
import rocketmanPrefab from '../prefabs/rocketman.js';
import aimPrefab from '../prefabs/aim.js';
import playerRocketEntity from './rocket.js';
import raindropRippleEntity from './raindrop-ripple.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import '../utils/typedef.js';

/**
 * Creates Player game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default function (app) {
    let player = new PIXI.Container();
    let rocketman = rocketmanPrefab(app);
    let aim = aimPrefab(app);
    aim.rotation = - Math.PI / 2;
    player.addChild(rocketman);
    player.addChild(aim);

    let projectiles = new PIXI.Container();
    let interactionEffects = new PIXI.Container();

    function shoot(target) {
        let rocket = playerRocketEntity(app);
        rocket.displayObject.position.set(player.x, player.y);
        rocket.displayObject.rotation = player.rotation;
        rocket.components.movement.target = target;
        projectiles.addChild(rocket.displayObject);
    }

    function move(target) {
        player.entity.components.movement.target = target;
        let circle = raindropRippleEntity(app);
        circle.displayObject.position.set(target.x, target.y);
        player.addChild(circle.displayObject);
        interactionEffects.addChild(circle.displayObject);
    }

    player.entity = {
        displayObject: player,
        type: DISPLAY_OBJECT_TYPE.CONTAINER,
        components: {
            movement: {
                speed: 5,
                onstartmoving: () => rocketman.play(),
                onstopmoving: () => rocketman.gotoAndStop(0)
            }
        },
        methods: {
            move,
            shoot
        },
        children: [projectiles, interactionEffects]
    };

    return player.entity;
}
