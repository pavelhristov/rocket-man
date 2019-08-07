import ATimer from './atimer.js';
import { randomIntFromInterval } from './utils/helpers.js';
import MonsterEntity from './entities/monster.js';

import SignalArray from './signal-array.js';
import Monster from './monster.js';

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
        this._monsters = new SignalArray();
        this._monsters.onAdd = (monster) => {
            let entity = new MonsterEntity(this._app);
            entity.x = monster.x;
            entity.y = monster.y;
            entity.monsterId = monster.id;
            this._container.addChild(entity.displayObject);
        };

        this._monsters.onRemove = (monster) => {
            let displayObject = this._container.children.find(d => d.entity && d.entity.monsterId === monster.id);
            if (!displayObject || !displayObject.entity) return;
            displayObject.entity.destroy();
        };
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
            let monster = new Monster('type', randomIntFromInterval(0 + 46 / 2, this._app.view.width - 46 / 2),
                randomIntFromInterval(0 + 46 / 2, this._app.view.height - 46 / 2)); // hardcoded sprites dimentions
            this._monsters.push(monster);

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
            let aliveMonsters = this._monsters.filter(m => m.alive);
            if (aliveMonsters.length) {
                let index = randomIntFromInterval(0, aliveMonsters.length - 1);
                this._monsters.remove(aliveMonsters[index]);
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
