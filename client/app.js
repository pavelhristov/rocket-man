import * as PIXI from 'pixi.js';
import { SPRITES } from './utils/assets.js';
import sceneManager from './scene-manager.js';

import CollisionSystem from './systems/collision.js';
import MovementSystem from './systems/movement.js';
import InputSystem from './systems/input.js';
import RotationSystem from './systems/rotation.js';
import TransformSystem from './systems/transform.js';

let app = new PIXI.Application({ width: 960, height: 950, antialias: true, backgroundColor: 0x252729 });
app.sceneManager = sceneManager(app);
document.body.appendChild(app.view);

app.loader
    .add([SPRITES.SNIPER, SPRITES.ROCKET, SPRITES.EXPLOSION, SPRITES.MONSTERS.BOBI,
    SPRITES.MONSTERS.DICHEV, SPRITES.MONSTERS.HRISCHO, SPRITES.MONSTERS.NEV,
    SPRITES.MONSTERS.PLAMEN, SPRITES.MONSTERS.SANIA, SPRITES.MONSTERS.VALERI, SPRITES.SKULL])
    .load(setup);

function setup() {
    registerSystems(app);
    app.sceneManager.loadScene('startmenu');

    // TODO: layers
    let style = new PIXI.TextStyle({ fill: 0xFFFFFF });
    let fpsCounter = new PIXI.Text('', style);
    app.stage.addChild(fpsCounter);
    app.ticker.add(delta => {
        app.sceneManager.updateScene(delta);
        fpsCounter.text = app.ticker.FPS.toFixed(0);
        app.loopSystems.forEach(s => s.process(delta));
    });
}

function registerSystems(app) {
    // initialize systems
    app.systems = {};
    app.systems.collision = new CollisionSystem();
    app.systems.movement = new MovementSystem();
    app.systems.input = new InputSystem(app);
    app.systems.input.bindEvents();
    app.systems.rotation = new RotationSystem();
    app.systems.transform = new TransformSystem();

    app.loopSystems = [app.systems.movement, app.systems.transform];
}
