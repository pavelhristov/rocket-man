import Timer from './utils/timer.js';
import SignalArray from './utils/signal-array.js';
import { randomIntFromInterval, randomFromInterval } from './utils/helpers';
import { SPRITES } from './utils/assets';

import RocketMan from './entities/rocketman.js';
import ExplosionEffect from './entities/explosion.js';
import Monster from './entities/monster.js';
import Effect from './entities/base/effect.js';
import Moving from './entities/base/moving.js';

/**
 * Main game scene
 * @class
 * 
 * @method init
 * @method update
 */
export default class Game {
    /**
     * @param {Renderer} renderer renderer system
     * @param {Input} input input system
     * @param {Collision} collision collision system
     */
    constructor(renderer, input, collision) {
        this.renderer = renderer;
        this.input = input;
        this.collision = collision;
        this.timer = new Timer();

        this._monsterTypes = Object.keys(SPRITES.MONSTERS);

        this._monsters = new SignalArray();
        this._monsters.onAdd = (e) => this.renderer.layers.enemies.addChild(e.displayObject);
        this._monsters.onRemove = (e) => this.renderer.layers.enemies.removeChild(e.displayObject);

        this._projectiles = new SignalArray();
        this._projectiles.onAdd = (e) => this.renderer.layers.projectiles.addChild(e.displayObject);
        this._projectiles.onRemove = (e) => this.renderer.layers.projectiles.removeChild(e.displayObject);

        this._userInteractions = new SignalArray();
        this._userInteractions.onAdd = (e) => this.renderer.layers.interactions.addChild(e.displayObject);
        this._userInteractions.onRemove = (e) => this.renderer.layers.interactions.removeChild(e.displayObject);
    }

    /**
     * @access private
     */
    _spawnMonster() {
        let type = this._monsterTypes[randomIntFromInterval(0, this._monsterTypes.length - 1)];
        let displayObject = this.renderer.createMonster(type);
        let x = randomFromInterval(0 + displayObject.width / 2, this.renderer.width - displayObject.width / 2);
        let y = randomFromInterval(0 + displayObject.height / 2, this.renderer.height - displayObject.height / 2);
        let monster = new Monster(displayObject, type, this.renderer, x, y);
        monster.ondestroy = () => this._monsters.remove(monster);
        this._monsters.push(monster);
    }

    /**
     * @access private
     */
    _despawnMonster() {
        let aliveMonsters = this._monsters.filter(m => m.alive);
        if (aliveMonsters.length) {
            let index = randomIntFromInterval(0, aliveMonsters.length - 1);
            this._monsters.remove(aliveMonsters[index]);
        }
    }

    /**
     * @access private
     * 
     * @param {Entity} entity entity
     */
    _shoot(entity) {
        let rocket = new Moving(this.renderer.createRocket(), entity.x, entity.y, 15, entity.rotation);
        rocket.moveTarget = this.renderer.getMousePosition();
        rocket.onStopMoving = (e) => {
            this._projectiles.remove(e);
            let explosion = new ExplosionEffect(this.renderer.createExplosion(), e.x, e.y, true);
            explosion.ondestroy = () => this._projectiles.remove(explosion);
            this._projectiles.push(explosion);
            explosion.start();
            this.collision.checkEntity(explosion, this._monsters);
        };

        this._projectiles.push(rocket);
    }

    /**
     * @access private
     * 
     * @param {Moving} entity entity
     */
    _move(entity) {
        let target = this.renderer.getMousePosition();
        entity.moveTarget = target;
        let clickEffect = new Effect(this.renderer.createRaindropRipple(), target.x, target.y);
        clickEffect.onupdate = (e, delta) => {
            e.displayObject.alpha -= 0.04 * delta;
            e.displayObject.scale.x += 0.25;
            e.displayObject.scale.y += 0.25;
            if (e.displayObject.alpha < 0) {
                this._userInteractions.remove(e);
            }
        };

        this._userInteractions.push(clickEffect);
    }

    /**
     * intializes the scene
     */
    init() {
        this.player = new RocketMan(this.renderer.createRocketMan(true), 230, 230, 5);
        this.renderer.layers.default.addChild(this.player.displayObject);
        this.input.bindEvent('click', () => this._shoot(this.player), true);
        this.input.bindEvent('contextmenu', (ev) => {
            this._move(this.player);
            ev.preventDefault();
            return false;
        }, true);

        this.timer.setTimer(1, 5, 'spawnMonster1', this._spawnMonster.bind(this));
        this.timer.setTimer(2, 5, 'spawnMonster2', this._spawnMonster.bind(this));
        this.timer.setTimer(5, 15, 'despawnMonster1', this._despawnMonster.bind(this));
    }

    /**
     * Update method that should be called inside the game loop.
     * 
     * @param {number} delta deltatime
     */
    update(delta) {
        if (this.input.state.mousein) {
            this.player.rotate(this.renderer.getMousePosition());
        }

        this.player.update(delta);

        this._monsters.forEach(e => e.update(delta));
        this._projectiles.forEach(e => e.update(delta));
        this._userInteractions.forEach(e => e.update(delta));
    }
}
