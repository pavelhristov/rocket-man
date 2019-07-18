import startMenuEntity from '../entities/startmenu.js';
import '../utils/typedef.js';

/**
 * Creates Start Menu game level
 * 
 * @param {PIXI.Application} app current running application.
 * @param {Object} systems game systems.
 * @param {Object} eventhandlers menu interraction callbacks
 * 
 * @returns {Level} start menu game level
 */
export default function (app, systems, { onstart }) {
    let menu = startMenuEntity(app, onstart);

    function play(delta) {
        if (menu.components.transform) {
            systems.transform.animate(delta, menu.displayObject, menu.components.transform);
        }
    }

    return { container: menu.displayObject, play };
}