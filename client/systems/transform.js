/**
 * System that handles the animation of transform properties of the an entity.
 */
export default class TransformSystem {
    constructor() {
        this._actions = [];
    }

    /**
     * Animates display object transfrom properties based on transfomr component. Should be called in the game loop.
     * 
     * @param {Number} delta delta time 
     * @param {PIXI.DisplayObject} transform display object 
     * @param {Object} component transform component 
     */
    animate(delta, transform, component) {
        this._updateValues(delta, transform, component);
        this._executeActions();
    }

    _updateValues(delta, transform, component) {
        if (!transform || !component) {
            return;
        }

        for (const key in component) {
            if (!isNaN(component[key])) {
                transform[key] += component[key] * delta;
                continue;
            }

            if (component[key].hasOwnProperty('value')) {
                transform[key] += component[key].value * delta;
                if (component[key].hasOwnProperty('min')) {
                    if (transform[key] <= component[key].min) {
                        transform[key] = component[key].min;
                        if (typeof component[key].onmin === 'function') {
                            this._queueAction(component[key].onmin);
                        }
                    }
                }

                if (component[key].hasOwnProperty('max')) {
                    if (transform[key] >= component[key].max) {
                        transform[key] = component[key].max;
                        if (typeof component[key].onmax === 'function') {
                            this._queueAction(component[key].onmax);
                        }
                    }
                }

                continue;
            }

            this._updateValues(delta, transform[key], component[key]);
        }
    }

    _queueAction(action) {
        this._actions.push(action);
    }

    _executeActions() {
        while (this._actions.length > 0) {
            this._actions.pop()();
        }
    }
}