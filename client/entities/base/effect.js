import Entity from './entity.js';

export default class Effect extends Entity {
    constructor(displayObject, x, y, onetime) {
        super(displayObject, x, y);

        if (onetime && this.displayObject) {
            this.displayObject.onComplete = () => this.destroy();
        }
    }

    //----------------------------------------------------------------------
    // methods

    set onupdate(value) { this._onupdate = value; }

    //----------------------------------------------------------------------
    // methods

    start() {
        if (typeof this.displayObject.play === 'function') {
            this.displayObject.play();
        }
    }

    stop() {
        if (typeof this.displayObject.gotoAndStop === 'function') {
            this.displayObject.gotoAndStop(0);
        }
    }

    update(delta) {
        if (typeof this._onupdate === 'function') {
            this._onupdate(this, delta);
        }
    }
}
