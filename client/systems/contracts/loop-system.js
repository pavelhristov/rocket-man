import BaseSystem from './base-system';

/**
 * System that process entities on every loop
 * 
 * @abstract
 */
export default class LoopSystem extends BaseSystem {
    constructor(componentName) {
        if (new.target === LoopSystem) throw new TypeError('Cannot construct abstract class "LoopSystem" instances directly');

        super(componentName);
    }

    process(delta, entity) {
        throw new Error('Not implemented!');
    }
}