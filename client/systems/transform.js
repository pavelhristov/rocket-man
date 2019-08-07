import LoopSystem from './contracts/loop-system';

/**
 * System that handles the animation of transform properties of the an entity.
 */
export default class TransformSystem extends LoopSystem {
    constructor() {
        super('transform');
        this._actions = [];
    }

    /**
     * Animates display object transfrom properties based on transfomr component.
     * 
     * @param {Number} delta delta time 
     * @param {Entity} entity entity
     */
    animate(delta, entity) {
        let transform = entity.displayObject;
        let component = entity.components.transform;
        let actions = this._updateValues(delta, transform, component);
        for (let i = 0; i < actions.length; i++) {
            actions[i]();
        }
    }

    _updateValues(delta, transform, component) {
        if (!transform || !component) {
            return;
        }

        let actions = [];
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
                            actions.push(component[key].onmin);
                        }
                    }
                }

                if (component[key].hasOwnProperty('max')) {
                    if (transform[key] >= component[key].max) {
                        transform[key] = component[key].max;
                        if (typeof component[key].onmax === 'function') {
                            actions.push(component[key].onmax);
                        }
                    }
                }

                continue;
            }

            let a = this._updateValues(delta, transform[key], component[key]);
            if (a && a.length) actions.push(...a);
        }

        return actions;
    }

    process(delta) {
        this._entities.forEach(e => {
            this.animate(delta, e);
        });
    }
}
