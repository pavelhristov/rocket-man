import { uuidv4 } from '../../utils/helpers.js';

export default class Entity {
    constructor(app, displayObject, type, components) {
        this._app = app;
        this.displayObject = displayObject;
        this.type = type;
        this.components = {};
        this._id = uuidv4();

        this.displayObject.entity = this;
        if (components) {
            for (const c in components) {
                this.addComponent(c, components[c]);
            }
        }
    }

    //-----------------------------------------------------------------------
    // properties

    set x(value) { this.displayObject.x = value; }
    get x() { return this.displayObject.x; }

    set y(value) { this.displayObject.y = value; }
    get y() { return this.displayObject.y; }

    get id() { return this._id; }

    //-----------------------------------------------------------------------
    // methods

    addComponent(name, component) {
        this.components[name] = component;
        let system = Object.values(this._app.systems).find(s => s._componentName === name);
        if (system) {
            system.register(this);
        }
    }

    removeComponent(name) {
        let system = Object.values(this._app.systems).find(s => s._componentName === name);
        if (system) {
            system.remove(this);
        }

        delete this.components[name];
    }

    destroy() {
        for (const c in this.components) {
            this.removeComponent(c);
        }

        delete this.displayObject.entity;
        this.displayObject.parent.removeChild(this.displayObject);
        this.displayObject.destroy();
    }
}
