import vec2 from './vec2.js';

export default class mat2 {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    static normalX() {
        return new mat2({ x: 0, y: 0 }, { x: 1, y: 0 });
    }

    static normalY() {
        return new mat2({ x: 0, y: 0 }, { x: 0, y: 1 });
    }

    angleTo(m) {
        let dir1 = this.getDirection();
        let dir2 = m.getDirection();
        return Math.atan2(dir2.y, dir2.x) - Math.atan2(dir1.y, dir1.x);
    }

    getDirection() {
        return {
            x: this.a.x - this.b.x,
            y: this.a.y - this.b.y
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


    negate() {
        this.a.x = -this.a.x;
        this.a.y = -this.a.y;
        this.b.x = -this.b.x;
        this.b.y = -this.b.y;

        return this;
    }
}