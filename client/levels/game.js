import * as PIXI from 'pixi.js';
import playerEntity from '../entities/player.js';
import monsterEntity from '../entities/monster.js';
import { randomIntFromInterval } from '../utils/helpers.js';
import collisionSystem from '../systems/collision.js';
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
    let monsters = new PIXI.Container();
    container.addChild(monsters);
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

    function spawnMonster1() {
        let spawnTime = randomIntFromInterval(1, 5);
        setTimeout(() => {
            let m = monsterEntity(app);
            collisionSystem.register(m);
            monsters.addChild(m.displayObject);
            spawnMonster1();
        }, spawnTime * 1000);
    }

    spawnMonster1();

    function spawnMonster2() {
        let spawnTime = randomIntFromInterval(2, 5);
        setTimeout(() => {
            let m = monsterEntity(app);
            collisionSystem.register(m);
            monsters.addChild(m.displayObject);
            spawnMonster2();
        }, spawnTime * 1000);
    }

    spawnMonster2();

    function despawnMonster() {
        let despawnTime = randomIntFromInterval(5, 15);
        setTimeout(() => {
            if (monsters.children.length) {
                let index = randomIntFromInterval(0, monsters.children.length - 1);
                collisionSystem.remove(monsters.getChildAt(index).entity);
                monsters.removeChildAt(index);
            }
            despawnMonster();
        }, despawnTime * 1000);
    }

    despawnMonster();

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
        monsters.children.filter(c => c.entity).forEach((c) => applySystems(c.entity, delta));
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
