import * as PIXI from 'pixi.js';
import playerEntity from '../entities/player.js';

export default function (app, systems) {
    let container = new PIXI.Container();

    let player = playerEntity(app);
    player.displayObject.position.set(230, 230); //magic start position
    container.addChild(player.displayObject, ...player.children);

    function play(delta) {
        let mousePosition = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        systems.rotation.lookAt(player.displayObject, mousePosition);
        systems.movement.move(delta, player.displayObject, player.components.movement);

        player.children.forEach(container => container.children.filter(c => c.entity).forEach((c) => setTimeout(() => applySystems(c.entity, delta), 0)));
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
