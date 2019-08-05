export default class Entity {
    constructor(displayObject, type, components) {
        this.displayObject = displayObject;
        this.type = type;
        this.components = components || {};
        this.id = Math.random();

        this.displayObject.entity = this;
    }

    set x(value) { this.displayObject.x = value; }
    get x() { return this.displayObject.x; }

    set y(value) { this.displayObject.y = value; }
    get y() { return this.displayObject.y; }

    destroy() {
        delete this.displayObject.entity;
        this.displayObject.parent.removeChild(this.displayObject);
        this.displayObject.destroy();
    }
}