import { Camera } from "../camera/camera.js";
import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";
import { Particle } from "../particle/particle.js";

export abstract class ParticleModel {

    force: Vec2;

    constructor() {
        this.force = new Vec2(0, 0);
    }

    addForce(force: Vec2) {
        this.force.x += force.x;
        this.force.y += force.y;
    }

    setForce(force: Vec2) {
        this.force.x = force.x;
        this.force.y = force.y;
    }

    abstract render(particle: Particle, draw: Draw, worldScale: number, camera: Camera): void;


    update(particle: Particle): void {
        particle.point.x += particle.velocity.x + this.force.x;
        particle.point.y += particle.velocity.y + this.force.y;
    };

}