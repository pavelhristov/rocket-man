import BaseSystem from './contracts/base-system';

/**
 * System that handles the user input.
 */
export default class InputSystem extends BaseSystem {
    constructor(app) {
        super('input');

        this._app = app;
        this.state = { mouseIn: true };
    }

    //-----------------------------------------------------------------------
    // event handlers

    _keyDownHandler(ev) {
        this._entities.filter(e => e.components.input[ev.keyCode]).forEach(e => {
            let key = e.components.input[ev.keyCode];
            if (key.hold) key.hold(ev);
            if (key.down && !key.isDown) {
                key.down(ev);
                key.isDown = true;
            }
        });
    }

    _keyUpHandler(ev) {
        this._entities.filter(e => e.components.input[ev.keyCode]).forEach(e => {
            let key = e.components.input[ev.keyCode];
            if (key.up) key.up(ev);
            if (key.down) key.isDown = false;
        });
    }

    _mouseLeftClickHandler(ev) {
        this._entities.filter(e => e.components.input.mouse.left).forEach(e => {
            let mouse = e.components.input.mouse;
            if (mouse.left) mouse.left(ev);
        });
    }

    _mouseRightClickHandler(ev) {
        this._entities.filter(e => e.components.input.mouse.right).forEach(e => {
            let mouse = e.components.input.mouse;
            if (mouse.right) mouse.right(ev);
        });

        ev.preventDefault();
        return false;
    }

    _mouseOverHandler(ev) {
        this.state.mouseIn = true;
    }

    _mouseOutHandler(ev) {
        this.state.mouseIn = false;
    }

    //---------------------------------------------------------------------
    // methods

    bindEvents() {
        this._app.view.addEventListener('click', this._mouseLeftClickHandler.bind(this));
        this._app.view.addEventListener('contextmenu', this._mouseRightClickHandler.bind(this));
        this._app.view.addEventListener('mouseover', this._mouseOverHandler.bind(this));
        this._app.view.addEventListener('mouseout', this._mouseOutHandler.bind(this));

        document.addEventListener('keydown', this._keyDownHandler.bind(this));
        document.addEventListener('keyup', this._keyUpHandler.bind(this));
    }

    unbindEvents() {
        this._app.view.removeEventListener('click', this._mouseLeftClickHandler);
        this._app.view.removeEventListener('contextmenu', this._mouseRightClickHandler);
        this._app.view.removeEventListener('mouseover', this._mouseOverHandler);
        this._app.view.removeEventListener('mouseout', this._mouseOutHandler);

        document.removeEventListener('keydown', this._keyDownHandler);
        document.removeEventListener('keyup', this._keyUpHandler);
    }
}
