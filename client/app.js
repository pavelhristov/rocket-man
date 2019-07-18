import * as PIXI from 'pixi.js';
import { SPRITES } from './utils/constants.js';
import levels from './levels';
import systems from './systems';
import inputManager from './utils/input-manager.js';

let app = new PIXI.Application({ width: 960, height: 950, antialias: true, backgroundColor: 0x252729 });
app.inputManager = inputManager(app);
app.inputManager.bindEvent('mouseover', () => app.inputManager.state.mousein = true, true);
app.inputManager.bindEvent('mouseout', () => app.inputManager.state.mousein = false, true);
document.body.appendChild(app.view);

app.loader
    .add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION])
    .load(setup);

function setup() {
    let state;
    let startMenu = levels.startmenu(app, systems, {
        onstart: () => {
            app.stage.removeChildren();
            let game = levels.game(app, systems);
            state = game.play;
            app.stage.addChild(game.container);
        }
    });

    state = startMenu.play;
    app.stage.addChild(startMenu.container);
    app.ticker.add(delta => { if (state) { state(delta); } });
}
