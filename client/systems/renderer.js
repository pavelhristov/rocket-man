import { SPRITES } from '../utils/assets';
import rocketmanPrefab from '../prefabs/rocketman';
import aimPrefab from '../prefabs/aim.js';
import explosionPrefab from '../prefabs/explosion';
import menuButtonPrefab from '../prefabs/menu-button.js';
import menuBackgroundPrefab from '../prefabs/menu-background.js';
import rocketPrefab from '../prefabs/rocket.js';

/**
 * some abstraction over pixi.js functionality
 */
export default class Renderer {
    constructor(PIXI, width, height) {
        this._app = new PIXI.Application({ width, height, antialias: true, backgroundColor: 0x252729 });
        this.PIXI = PIXI;
        this.TextureCache = this._app.loader.resources;

        this.layers = {}; // TODO: switch to pixi layers
        this.layers.background = new PIXI.Container();
        this.layers.enemies = new PIXI.Container();
        this.layers.default = new PIXI.Container();
        this.layers.projectiles = new PIXI.Container();
        this.layers.interactions = new PIXI.Container();
        this.layers.ui = new PIXI.Container();
        this._app.stage.addChild(this.layers.background,
            this.layers.enemies,
            this.layers.default,
            this.layers.projectiles,
            this.layers.interactions,
            this.layers.ui);
    }

    //----------------------------------------------------------------------
    // properties

    get view() { return this._app.view; }

    get width() { return this._app.view.width; }

    get height() { return this._app.view.height; }

    /**
     * @param {function} value function that will be called on each render loop
     */
    set update(value) {
        if (typeof value !== 'function') throw new TypeError('update must be a function!');
        this._update = value;
    }

    get elapsedMS() { return this._app.ticker.elapsedMS; }

    //----------------------------------------------------------------------
    // methods

    /**
     * Loads assets
     * 
     * @returns {Promise} loaded assets
     */
    load() {
        return new Promise((res, rej) => {
            this._app.loader.add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION, SPRITES.MONSTERS.BOBI,
            SPRITES.MONSTERS.DICHEV, SPRITES.MONSTERS.HRISCHO, SPRITES.MONSTERS.NEV,
            SPRITES.MONSTERS.PLAMEN, SPRITES.MONSTERS.SANIA, SPRITES.MONSTERS.VALERI, SPRITES.SKULL])
                .load(res);
        });
    }

    /**
     * Starts the render loop.
     */
    render() {
        this._app.ticker.add((delta) => { if (typeof this._update === 'function') this._update(delta); });
    }

    /**
     * Clears all objects from the scene
     */
    clearScene() {
        for (const key in this.layers) {
            this.layers[key].removeChildren();
        }

        this._update = undefined;
    }

    /**
     * @return {vec2} mouse postion 
     */
    getMousePosition() { // should be in input
        return this._app.renderer.plugins.interaction.mouse.getLocalPosition(this._app.stage);
    }

    //----------------------------------------------------------------------
    // prefabs

    /**
     * Gets specific monster texture. Returns undefined if monster type does not exist.
     * 
     * @param {string} type monster type
     * @returns {PIXI.Texture} texture 
     */
    getMonster(type) {
        if (!type) {
            return;
        }

        if (type.toLowerCase() === 'dead') {
            return this.TextureCache[SPRITES.SKULL].texture;
        }

        type = type.toUpperCase();
        if (SPRITES.MONSTERS[type]) {
            return this.TextureCache[SPRITES.MONSTERS[type]].texture;
        }
    }

    /**
     * Creates random monster.
     * 
     * @access public
     * 
     * @param {string} type monster type
     * 
     * @returns {PIXI.DisplayObject} monster display object
     */
    createMonster(type) {
        let monster = new this.PIXI.Sprite(this.TextureCache[SPRITES.MONSTERS[type]].texture);
        monster.anchor.set(0.5, 0.5);

        return monster;
    }

    /**
     * Creates random monster.
     * 
     * @access public
     * 
     * @param {bool} hasAim defines if the rocketman has aim.
     * 
     * @returns {PIXI.DisplayObject} monster display object
     */
    createRocketMan(hasAim) {
        let rocketman = rocketmanPrefab(this._app);
        if (hasAim) {
            let aim = aimPrefab(this._app);
            aim.rotation = - Math.PI / 2;
            aim.x = rocketman.pivot.x;
            rocketman.addChild(aim);
        }

        return rocketman;
    }

    /**
     * @returns {PIXI.DisplayObject} rocket display object
     */
    createRocket() {
        return rocketPrefab(this._app);
    }

    /**
     * @returns {PIXI.DisplayObject} explosion display object
     */
    createExplosion() {
        return explosionPrefab(this._app);
    }

    /**
     * @param {hex} color color
     * @returns {PIXI.DisplayObject} raindrop ripple display object
     */
    createRaindropRipple(color = 0xFF0000) {
        let circle = new this.PIXI.Graphics();
        circle.lineStyle(0.8, color);
        circle.drawCircle(0, 0, 3);
        circle.endFill();

        return circle;
    }

    /**
     * @returns {PIXI.DisplayObject} menu background display object
     */
    createMenuBackground() {
        let menu = menuBackgroundPrefab(this._app);
        menu.x = this._app.screen.width / 2;
        menu.y = this._app.screen.height / 2;
        menu.pivot.x = menu.width / 2;
        menu.pivot.y = menu.height / 2;

        return menu;
    }

    /**
     * @param {string} text button text
     * @param {function} onclick on click callback
     * @returns {PIXI.DisplayObject} menu button display object
     */
    createMenuButton(text, onclick) {
        let btn = menuButtonPrefab(this._app, text, () => { if (typeof onclick === 'function') onclick(); });
        btn.pivot.set(btn.width / 2, btn.height / 2);
        return btn;
    }
}
