import { Vec2 } from "../geometry/geometry.js";
export class ParticleModel {
    constructor() {
        this.force = new Vec2(0, 0);
    }
    addForce(force) {
        this.force.x += force.x;
        this.force.y += force.y;
    }
    setForce(force) {
        this.force.x = force.x;
        this.force.y = force.y;
    }
    update(particle) {
        particle.point.x += particle.velocity.x + this.force.x;
        particle.point.y += particle.velocity.y + this.force.y;
    }
    ;
}
