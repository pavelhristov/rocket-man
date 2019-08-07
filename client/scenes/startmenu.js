import StartMenuEntity from '../entities/startmenu.js';
import '../utils/typedef.js';

/**
 * Creates Start Menu game scene
 * 
 * @param {PIXI.Application} app current running application.
 * @param {Object} systems game systems.
 * 
 * @returns {Scene} start menu game scene
 */
export default function (app) {
    let menu = new StartMenuEntity(app);

    function update(delta) { }

    return { container: menu.displayObject, update };
}