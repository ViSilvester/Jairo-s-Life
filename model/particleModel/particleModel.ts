import { Draw } from "../draw/draw.js";
import { Particle } from "../particle/particle.js";

export abstract class ParticleModel {

    abstract render(particle: Particle, draw: Draw, worldScale: number): void;
    update(particle: Particle): void {
        particle.point.x += particle.velocity.x;
        particle.point.y += particle.velocity.y;
    };

}