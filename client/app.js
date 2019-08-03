import * as PIXI from 'pixi.js';
import { SPRITES } from './utils/constants.js';
import inputManager from './utils/input-manager.js';
import sceneManager from './scene-manager.js';

let app = new PIXI.Application({ width: 960, height: 950, antialias: true, backgroundColor: 0x252729 });
app.sceneManager = sceneManager(app);
app.inputManager = inputManager(app);
app.inputManager.bindEvent('mouseover', () => app.inputManager.state.mousein = true, true);
app.inputManager.bindEvent('mouseout', () => app.inputManager.state.mousein = false, true);
document.body.appendChild(app.view);

app.loader
    .add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION, SPRITES.MONSTERS.BOBI,
    SPRITES.MONSTERS.DICHEV, SPRITES.MONSTERS.HRISCHO, SPRITES.MONSTERS.NEV,
    SPRITES.MONSTERS.PLAMEN, SPRITES.MONSTERS.SANIA, SPRITES.MONSTERS.VALERI, SPRITES.SKULL])
    .load(setup);

function setup() {
    app.sceneManager.loadScene('startmenu');
    app.ticker.add(delta => { app.sceneManager.updateScene(delta); });
}
