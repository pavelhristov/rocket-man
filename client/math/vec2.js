/**
 * Helper class for math operations with two dimensional vectors.
 */
export default class vec2 {
    static magnitude(vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    static normalize(vec) {
        let magnitude = vec2.magnitude(vec);
        vec.x /= magnitude;
        vec.y /= magnitude;

        return vec;
    }

    static negate(vec) {
        vec.x = -vec.x;
        vec.y = -vec.y;
        return vec;
    }
}