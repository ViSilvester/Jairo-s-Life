import { Draw } from "../../draw/draw.js";
import { Vec2 } from "../../geometry/geometry.js";
import { Particle } from "../../particle/particle.js";
import { ParticleModel } from "../particleModel.js";

export class RainModel extends ParticleModel {

    render(particle: Particle, draw: Draw, worldScale: number): void {
        let p1 = new Vec2(
            (particle.point.x - particle.velocity.x) * worldScale,
            (particle.point.y - particle.velocity.y) * worldScale
        );
        let p2 = new Vec2(
            particle.point.x * worldScale,
            particle.point.y * worldScale
        );
        draw.line(p1, p2, 200, 200, 255);
    }

    update(particle: Particle): void {
        particle.velocity.y = 0.8;
        super.update(particle);
    }

}