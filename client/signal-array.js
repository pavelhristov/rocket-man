export default class SignalArray extends Array {
    // -----------------------------------------------------------------------------
    // properties

    /**
     * @param {function} value onAdd
     */
    set onAdd(value) {
        if (!value) {
            this._onAdd = undefined;
            return;
        }

        if (typeof value !== 'function') throw new TypeError('onAdd must be a function!');
        this._onAdd = value;
    }

    /**
     * @param {function} value onAdd
     */
    set onRemove(value) {
        if (!value) {
            this._onRemove = undefined;
            return;
        }

        if (typeof value !== 'function') throw new TypeError('onRemove must be a function!');
        this._onRemove = value;
    }

    // -----------------------------------------------------------------------------
    // overrides

    push(...items) {
        if (!items) return super.length;

        let length = super.push(...items);
        items.forEach(i => this._onAdd(i));
        return length;
    }

    pop() {
        let items = super.pop();
        this._onRemove(items);

        return items;
    }

    shift() {
        let items = super.shift();
        this._onRemove(items);

        return items;
    }

    splice(start, deleteCount, ...items) {
        let deleted = super.splice(start, deleteCount, ...items);
        if (items) items.forEach(i => this._onAdd(i));
        if (deleted) deleted.forEach(d => this._onRemove(d));

        return deleted;
    }

    // -----------------------------------------------------------------------------
    // methods

    remove(monster) {
        let index = this.indexOf(monster);
        this.splice(index, 1);

        return this.length;
    }
}
