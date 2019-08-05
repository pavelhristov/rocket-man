import StartMenuEntity from '../entities/startmenu.js';
import '../utils/typedef.js';

/**
 * Creates Start Menu game level
 * 
 * @param {PIXI.Application} app current running application.
 * @param {Object} systems game systems.
 * 
 * @returns {Level} start menu game level
 */
export default function (app, systems) {
    let menu = new StartMenuEntity(app);

    function update(delta) {
        if (menu.components.transform) {
            systems.transform.animate(delta, menu.displayObject, menu.components.transform);
        }
    }

    return { container: menu.displayObject, update };
}