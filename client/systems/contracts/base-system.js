import { uuidv4 } from '../../utils/helpers.js';

/**
 * Base System
 * 
 * @abstract
 */
export default class BaseSystem {
    constructor(componentName) {
        if (new.target === BaseSystem) throw new TypeError('Cannot construct abstract class "BaseSystem" instances directly');

        this._entities = [];
        this._componentName = componentName;
    }

    register(entity) {
        if (this._entities.find(c => c.components[this._componentName].id === entity.components[this._componentName].id)) {
            console.log('entity has already been registered for collision', entity);
            return;
        }

        entity.components[this._componentName].id = uuidv4();
        this._entities.push(entity);
    }

    remove(entity) {
        let index = this._entities.indexOf(entity);
        if (index > -1) {
            this._entities.splice(index, 1);
        }
    }
}