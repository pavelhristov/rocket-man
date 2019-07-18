import * as PIXI from 'pixi.js';
import { SPRITES } from './utils/constants.js';
import levels from './levels';

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({ width: 960, height: 950, antialias: true, backgroundColor: 0x252729 });
document.body.appendChild(app.view);

let state;
app.loader
    .add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION])
    .on('progress', loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log('loading: ' + resource.url);
    console.log('progress: ' + loader.progress + '%');
}

function setup() {
    let startMenu = levels.startmenu(app, {
        onstart: () => {
            app.stage.removeChildren();
            let game = levels.game(app);
            state = game.play;
            app.stage.addChild(game.container);
        }
    });

    app.stage.addChild(startMenu.container);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    if (state) { state(delta); }
}
