import * as PIXI from 'pixi.js';
import playerEntity from '../entities/player.js';
import '../utils/typedef.js';

/**
 * Creates Main game level.
 * 
 * @param {PIXI.Application} app current running application.
 * @param {Object} systems game systems.
 * 
 * @returns {Level} main game level.
 */
export default function (app, systems) {
    let container = new PIXI.Container();
    // create player
    let player = playerEntity(app);
    player.displayObject.position.set(230, 230); //magic start position
    container.addChild(player.displayObject, ...player.children);

    // register player movement
    app.inputManager.bindEvent('contextmenu', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        player.methods.move(target);

        ev.preventDefault();
        return false;
    }, true);

    // register player attack
    app.inputManager.bindEvent('click', function (ev) {
        let target = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
        player.methods.shoot(target);
    }, true);

    /**
     * Level game loop
     * 
     * @param {Numer} delta delta time
     */
    function update(delta) {
        systems.movement.move(delta, player.displayObject, player.components.movement);
        if (app.inputManager.state.mousein) {
            let mousePosition = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
            systems.rotation.lookAt(player.displayObject, mousePosition);
        }

        player.children.forEach(container => container.children.filter(c => c.entity).forEach((c) => applySystems(c.entity, delta)));
    }

    /**
     * Helper method for game loop
     * 
     * @access private
     * 
     * @param {Entity} entity game entity to be processed by game systems
     * @param {Number} delta delta time 
     */
    function applySystems(entity, delta) {
        delta = delta || 1;
        if (entity.components.movement) {
            systems.movement.move(delta, entity.displayObject, entity.components.movement);
        }

        if (entity.components.transform) {
            systems.transform.animate(delta, entity.displayObject, entity.components.transform);
        }
    }

    return { container, update };
}
