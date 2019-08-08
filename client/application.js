import Renderer from './systems/renderer.js';
import Input from './systems/input.js';
import Collision from './systems/collision.js';

import Game from './game.js';

/**
 * Application
 * @class
 * 
 * @method run
 */
export default class Application {
    constructor(PIXI) {
        this.renderer = new Renderer(PIXI, 960, 950);
        this.input = new Input(this.renderer.view);
        this.collision = new Collision();
    }

    loadResources() {
        document.body.appendChild(this.renderer.view);
        return this.renderer.load()
            .then(() => { this.renderer.render(); })
            .then(() => {
                this.input.bindEvent('mouseover', () => this.input.state.mousein = true, true);
                this.input.bindEvent('mouseout', () => this.input.state.mousein = false, true);
            });
    }

    /**
     * Loads start menu
     * @access private
     */
    _loadStartMenu() {
        let animate = false;
        this.renderer.clearScene();
        let menu = this.renderer.createMenuBackground();
        let button = this.renderer.createMenuButton('Start Game', () => { animate = true; });
        menu.addChild(button);
        button.position.set(menu.width / 2, menu.height / 2);
        this.renderer.layers.ui.addChild(menu);

        let yToSwitch = menu.y + 50;
        let change = 5;
        this.renderer.update = (delta) => {
            if (!animate) return;
            if (menu.y <= 0) {
                this.renderer.clearScene();
                this._loadGame();
                return;
            }

            menu.y += change * delta;
            if (menu.y > yToSwitch) {
                change = -35;
            }
        };
    }

    /**
     * Loads main game scene
     * @access private
     */
    _loadGame() {
        let game = new Game(this.renderer, this.input, this.collision);
        game.init();

        this.renderer.update = game.update.bind(game);
    }

    /**
     * Runs the application.
     */
    run() {
        this.loadResources().then(this._loadStartMenu.bind(this));
    }
}
