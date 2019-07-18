import * as PIXI from 'pixi.js';
import playerEntity from '../entities/player.js';
import { MovementSystem } from '../systems/movement.js';
import { RotationSytem } from '../systems/rotation.js';
import { TransformSystem } from '../systems/transform.js';

export default function (app) {
    let container = new PIXI.Container();

    let player = playerEntity(app);
    player.displayObject.position.set(230, 230); //magic start position
    container.addChild(player.displayObject, ...player.children);

    let systems = {
        movement: new MovementSystem(),
        rotation: new RotationSytem(),
        transform: new TransformSystem()
    };

    function play(delta) {
        let mousePosition = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        systems.rotation.lookAt(player.displayObject, mousePosition);
        systems.movement.move(delta, player.displayObject, player.components.movement);

        player.children.forEach(container => container.children.filter(c => c.entity).forEach((c) => applySystems(c.entity, delta)));
    }

    function applySystems(entity, delta) {
        delta = delta || 1;
        if (entity.components.movement) {
            systems.movement.move(delta, entity.displayObject, entity.components.movement);
        }

        if (entity.components.transform) {
            systems.transform.animate(delta, entity.displayObject, entity.components.transform);
        }
    }

    return { container, play };
}
