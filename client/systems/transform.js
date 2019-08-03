/**
 * System that handles the animation of transform properties of the an entity.
 */
export default (function () {
    const _actions = [];

    /**
     * Animates display object transfrom properties based on transfomr component. Should be called in the game loop.
     * 
     * @param {Number} delta delta time 
     * @param {PIXI.DisplayObject} transform display object 
     * @param {Object} component transform component 
     */
    function animate(delta, transform, component) {
        _updateValues(delta, transform, component);
        _executeActions();
    }

    function _updateValues(delta, transform, component) {
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
                            _queueAction(component[key].onmin);
                        }
                    }
                }

                if (component[key].hasOwnProperty('max')) {
                    if (transform[key] >= component[key].max) {
                        transform[key] = component[key].max;
                        if (typeof component[key].onmax === 'function') {
                            _queueAction(component[key].onmax);
                        }
                    }
                }

                continue;
            }

            _updateValues(delta, transform[key], component[key]);
        }
    }

    function _queueAction(action) {
        _actions.push(action);
    }

    function _executeActions() {
        while (_actions.length > 0) {
            _actions.pop()();
        }
    }

    return {
        animate
    };
})();
