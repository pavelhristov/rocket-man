let killOnCollisionMixin = Base => class extends Base {
    onCollision(e) { if (e && e.alive) { e.alive = false; } }
};

export default killOnCollisionMixin;
