import * as PIXI from 'pixi.js';
import PlayerEntity from '../entities/player.js';
import MonsterSpawner from '../monster-spawner.js';
import '../utils/typedef.js';

/**
 * Creates Main game scene.
 * 
 * @param {PIXI.Application} app current running application.
 * @param {Object} systems game systems.
 * 
 * @returns {Scene} main game scene.
 */
export default function (app) {
    let container = new PIXI.Container();
    let monsters = new PIXI.Container();
    container.addChild(monsters);
    // create player
    let player = new PlayerEntity(app);
    player.displayObject.position.set(230, 230); //magic start position
    container.addChild(player.displayObject, ...player.children);

    let spawner = new MonsterSpawner(app, monsters);
    spawner.start();

    /**
     * Scene game loop
     * 
     * @param {Numer} delta delta time
     */
    function update(delta) {
        if (app.systems.input.state.mouseIn) {
            let mousePosition = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
            app.systems.rotation.lookAt(player.displayObject, mousePosition);
        }
    }

    return { container, update };
}
