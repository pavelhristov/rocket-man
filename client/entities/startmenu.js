import * as PIXI from 'pixi.js';
import menuButtonPrefab from '../prefabs/menu-button.js';
import menuBackgroundPrefab from '../prefabs/menu-background.js';

export default function (app, onstart) {
    let menu = new PIXI.Container();
    menu.x = app.screen.width / 2;
    menu.y = app.screen.height / 2;
    menu.pivot.x = menu.width / 2;
    menu.pivot.y = menu.height / 2;

    let background = menuBackgroundPrefab(app);
    menu.addChild(background);

    let btnStartGame = menuButtonPrefab(app, 'Start Game', startGameHandler);
    menu.addChild(btnStartGame);

    menu.entity = {
        displayObject: menu,
        type: 'container',
        components: {}
    };

    function startGameHandler() {
        let currentY = menu.y;
        menu.entity.components.transform = {
            y: {
                value: 5,
                max: currentY + 50,
                onmax: () => {
                    // change direction when hit
                    menu.entity.components.transform.y = {
                        value: -35,
                        min: 0,
                        onmin: onstart
                    };
                }
            }
        };
    }

    return menu.entity;
}