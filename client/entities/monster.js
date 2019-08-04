import monsterPrefab from '../prefabs/monster.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import { randomIntFromInterval } from '../utils/helpers.js';
import { SPRITES } from '../utils/constants.js';
import collisionSystem from '../systems/collision.js';
import '../utils/typedef.js';

/**
 * Monster game entity
 * 
 * @param {PIXI.Application} app current running application 
 * 
 * @returns {Entity} Entity object
 */
export default function (app) {
    let monster = monsterPrefab(app);
    monster.x = randomIntFromInterval(0 + monster.width / 2, app.view.width - monster.width / 2);
    monster.y = randomIntFromInterval(0 + monster.height / 2, app.view.height - monster.height / 2);
    monster.entity = {
        displayObject: monster,
        type: DISPLAY_OBJECT_TYPE.SPRITE,
        id: Math.random(),
        monsterType: '',
        isMonster: true,
        alive: true,
        components: { rigidBody: { type: 'circle' } },
        methods: {
            die() {
                monster.texture = app.loader.resources[SPRITES.SKULL].texture;
                monster.width = 48;
                monster.height = 48;
                monster.entity.alive = false;
                collisionSystem.remove(monster.entity);
                monster.entity.components.transform = {
                    alpha: {
                        value: -0.005,
                        min: 0,
                        onmin() {
                            monster.parent.removeChild(monster);
                        }
                    }
                };
            }
        }
    };

    return monster.entity;
}


/**
* @class Monster
* @property {number} id
* @property {number} x
* @property {number} y
* @property {string} type
* @property {boolean} alive
*/