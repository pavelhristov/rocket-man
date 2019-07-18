/**
 * Helper class for math operations with two dimensional vectors.
 */
export default class vec2 {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    static normalX() {
        return new vec2({ x: 0, y: 0 }, { x: 1, y: 0 });
    }

    static normalY() {
        return new vec2({ x: 0, y: 0 }, { x: 0, y: 1 });
    }

    angleTo(vec) {
        let v1dir = this.getDirection();
        let v2dir = vec.getDirection();
        return Math.atan2(v2dir.y, v2dir.x) - Math.atan2(v1dir.y, v1dir.x);
    }

    getDirection() {
        return {
            x: this.a.x - this.b.x,
            y: this.a.y - this.b.y
        };
    }

    static getDirection(a, b){
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    }

    normalize() {
        let magnitudeA = vec2.magnitude(this.a);
        this.a.x /= magnitudeA;
        this.a.y /= magnitudeA;

        let magnitudeB = vec2.magnitude(this.b);
        this.b.x /= magnitudeB;
        this.b.y /= magnitudeB;

        return this;
    }

    static magnitude(point) {
        return Math.sqrt(point.x * point.x + point.y * point.y);
    }

    static normalize (point){
        let magnitude = vec2.magnitude(point);
        point.x /= magnitude;
        point.y /= magnitude;

        return point;
    }

    static negate (point){
        point.x = -point.x;
        point.y = -point.y;
        return point;
    }

    negate() {
        this.a.x = -this.a.x;
        this.a.y = -this.a.y;
        this.b.x = -this.b.x;
        this.b.y = -this.b.y;

        return this;
    }
}