import ATimer from './atimer.js';
import { randomIntFromInterval } from './utils/helpers.js';
import MonsterEntity from './entities/monster.js';
import collisionSystem from './systems/collision.js';

/**
 * @class MonsterSpawner
 * @classdesc handles spawning of mosters.
 * @access public
 */
export default class MonsterSpawner extends ATimer {
    /**
     * @access public
     * 
     * @param {PIXI.Application} app current running application
     * @param {PIXI.Container} container container for spawned monsters
     */
    constructor(app, container) {
        super();
        this._app = app;
        this._container = container;
    }

    /**
     * Setups recursive timer to spawn a monster after seconds in the given range
     * 
     * @access private
     * 
     * @param {number} min minimum delay before execution in seconds
     * @param {number} max maximum delay before execution in seconds
     * @param {string} name name for timer to allow cancelation
     */
    _scheduleSpawnMonster(min, max, name) {
        this._setTimer(min, max, name, () => {
            let m = new MonsterEntity(this._app);
            m.x = randomIntFromInterval(0 + m.displayObject.width / 2, this._app.view.width - m.displayObject.width / 2);
            m.y = randomIntFromInterval(0 + m.displayObject.height / 2, this._app.view.height - m.displayObject.height / 2);
            collisionSystem.register(m);
            this._container.addChild(m.displayObject);
            this._scheduleSpawnMonster(min, max, name);
        });
    }

    /**
     * Setups recursive timer to despawn a monster after seconds in the given range
     * 
     * @access private
     * 
     * @param {number} min minimum delay before execution in seconds
     * @param {number} max maximum delay before execution in seconds
     * @param {string} name name for timer to allow cancelation
     */
    _scheduleDespawnMonster(min, max, name) {
        this._setTimer(min, max, name, () => {
            if (this._container.children.length) { // TODO: remove another if is not alive
                let index = randomIntFromInterval(0, this._container.children.length - 1);
                collisionSystem.remove(this._container.getChildAt(index).entity);
                this._container.removeChildAt(index);
            }

            this._scheduleDespawnMonster(min, max, name);
        });
    }

    /**
     * Starts the predefined monster spawning
     */
    start() {
        this._scheduleSpawnMonster(1, 5, 'spawnMonster1');
        this._scheduleSpawnMonster(2, 5, 'spawnMonster2');
        this._scheduleDespawnMonster(5, 15, 'despawnMonster');
    }
}