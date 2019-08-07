/**
 * Helper class for math operations with two dimensional vectors.
 * @class
 */
export default class vec2 extends Array {
    constructor() {
        if (typeof arguments[0] === 'object') {
            super(arguments[0].x, arguments[0].y);
        } else if (typeof arguments[0] === 'number') {
            super(arguments[0], typeof arguments[1] === 'number' ? arguments[1] : arguments[0]);
        } else {
            super(0, 0);
        }
    }

    /**
     * @param {number} value value
     */
    set x(value) { this[0] = value; }
    get x() { return this[0]; }

    /**
     * @param {number} value value
     */
    set y(value) { this[1] = value; }
    get y() { return this[1]; }

    /**
     * @param {vec2} vec vector 
     * @returns {number} magnitude
     */
    static magnitude(vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    /**
     * @param {vec2} vec vector 
     * @returns {vec2} normalized vector
     */
    static normalize(vec) {
        let magnitude = vec2.magnitude(vec);
        vec.x /= magnitude;
        vec.y /= magnitude;

        return vec;
    }

    /**
     * @param {vec2} vec vector 
     * @returns {vec2} normalized vector
     */
    static negate(vec) {
        vec.x = -vec.x;
        vec.y = -vec.y;
        return vec;
    }
}