import * as PIXI from 'pixi.js';
import rocketmanPrefab from '../prefabs/rocketman.js';
import aimPrefab from '../prefabs/aim.js';
import playerRocketEntity from './rocket.js';
import raindropRippleEntity from './raindrop-ripple.js';

export default function (app) {
    let container = new PIXI.Container();
    let rocketman = rocketmanPrefab(app);
    let aim = aimPrefab(app);
    aim.rotation = - Math.PI / 2;
    container.addChild(rocketman);
    container.addChild(aim);

    let bullets = new PIXI.Container();
    let interactionEffects = new PIXI.Container();

    container.entity = {
        displayObject: container,
        type: 'container',
        components: {
            movement: {
                speed: 5,
                onstartmoving: () => rocketman.play(),
                onstopmoving: () => rocketman.gotoAndStop(0)
            }
        }
    };

    // todo: some sort of input manager
    app.view.addEventListener('contextmenu', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        container.entity.components.movement.target = target;

        let circle = raindropRippleEntity(app);
        circle.displayObject.position.set(target.x, target.y);
        container.addChild(circle.displayObject);
        interactionEffects.addChild(circle.displayObject);

        ev.preventDefault();
        return false;
    });

    app.view.addEventListener('click', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        let rocket = playerRocketEntity(app);
        rocket.displayObject.position.set(container.x, container.y);
        rocket.displayObject.rotation = container.rotation;
        rocket.components.movement.target = target;
        bullets.addChild(rocket.displayObject);
    });

    container.entity.children = [bullets, interactionEffects];

    return container.entity;
}
