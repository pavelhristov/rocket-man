import monsterPrefab from '../prefabs/monster.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import { SPRITES } from '../utils/assets.js';
import Entity from './contracts/entity.js';
import '../utils/typedef.js';

/**
 * @class MonsterEntity
 * 
 * @property {number} id
 * @property {number} x
 * @property {number} y
 * @property {string} type
 * @property {boolean} alive
 */
export default class MonsterEntity extends Entity {
    /**
     * @param {PIXI.Application} app current running application
     */
    constructor(app) {
        let monster = monsterPrefab(app);
        super(app, monster, DISPLAY_OBJECT_TYPE.SPRITE, { rigidBody: { type: 'circle' } });
        this._alive = true;
    }

    /**
     * @param {boolean} value value
     */
    set alive(value) {
        if (!this._alive) return; // no resurrections
        this._alive = !!value;
        if (value) return;

        this.displayObject.texture = this._app.loader.resources[SPRITES.SKULL].texture;
        this.displayObject.width = 48;
        this.displayObject.height = 48;
        this.removeComponent('rigidBody');
        this.addComponent('transform', {
            alpha: {
                value: -0.005, // TODO: create timed option
                min: 0,
                onmin: () => this.destroy()
            }
        });
    }
    get alive() { return this._alive; }
}
