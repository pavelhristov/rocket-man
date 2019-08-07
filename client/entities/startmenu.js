import * as PIXI from 'pixi.js';
import menuButtonPrefab from '../prefabs/menu-button.js';
import menuBackgroundPrefab from '../prefabs/menu-background.js';
import { DISPLAY_OBJECT_TYPE } from '../utils/constants.js';
import Entity from './contracts/entity.js';
import '../utils/typedef.js';

/**
 * Creates Start Menu game entity
 * 
 * @param {PIXI.Application} app current running application 
 * @param {function} onstart callback function will be called when 'Start Game' button click animation
 * 
 * @returns {Entity} Entity object
 */
export default class StartMenuEntity extends Entity {
    constructor(app) {
        let menu = new PIXI.Container();
        menu.x = app.screen.width / 2;
        menu.y = app.screen.height / 2;
        menu.pivot.x = menu.width / 2;
        menu.pivot.y = menu.height / 2;

        let background = menuBackgroundPrefab(app);
        menu.addChild(background);

        let btnStartGame = menuButtonPrefab(app, 'Start Game', () => this.startGame());
        menu.addChild(btnStartGame);

        super(app, menu, DISPLAY_OBJECT_TYPE.GRAPHICS);
    }

    startGame() {
        let currentY = this.y;
        this.addComponent('transform', {
            y: {
                value: 5,
                max: currentY + 50,
                onmax: () => {
                    // change direction when hit
                    this.components.transform.y = {
                        value: -35,
                        min: 0,
                        onmin: () => {
                            this.removeComponent('transfrom');
                            this._app.sceneManager.loadScene('game');
                        }
                    };
                }
            }
        });
    }
}