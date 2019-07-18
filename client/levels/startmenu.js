import startMenuEntity from '../entities/startmenu.js';

export default function (app, systems, { onstart }) {
    let menu = startMenuEntity(app, onstart);

    function play(delta) {
        if (menu.components.transform) {
            systems.transform.animate(delta, menu.displayObject, menu.components.transform);
        }
    }

    return { container: menu.displayObject, play };
}