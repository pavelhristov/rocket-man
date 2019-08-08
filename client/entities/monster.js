import Entity from './base/entity.js';

/**
 * @class Monster
 * @property {number} id
 * @property {number} x
 * @property {number} y
 * @property {string} type
 * @property {boolean} alive
 */
export default class Monster extends Entity {
    constructor(displayObject, type, renderer, x = 0, y = 0) {
        super(displayObject, x, y);
        this._rotation = 0;
        this._type = type;
        this._alive = true;
        this._renderer = renderer;
        this._alpha = 1;
        this._fadeTime = 10 * 1000; // = 60 / (10 * 1000); // fade over 10 seconds: fps / (seconds * 1000) * deltaTime
    }

    //----------------------------------------------------------------------
    // properties

    get alive() { return this._alive; }
    set alive(value) {
        if (!this._alive) return; // no resurrections
        this._alive = !!value;
        if (value) return;

        this.displayObject.texture = this._renderer.getMonster('dead');
        this.displayObject.width = 48;
        this.displayObject.height = 48;
        this._isFading = true;
    }

    get alpha() { return this._alpha; }
    set alpha(value) { this._alpha = value; this._propertyChanged('alpha'); }

    get type() { return this._type; }
    /**
     * @param {SPRITES.MONSTERS} value monster type
     */
    set type(value) {
        this._type = value;
        this.displayObject.texture = this.renderer.getMonster(this._type);
    }

    //----------------------------------------------------------------------
    // methods

    /**
     * update method, should be called in the game loop.
     * 
     * @param {number} delta delta time
     */
    update(delta) {
        if (!this._isFading) return;
        this.displayObject.alpha -= this._renderer.elapsedMS / this._fadeTime;
        if (this.displayObject.alpha < 0) {
            this.destroy();
        }
    }
}
