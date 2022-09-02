import { Vec2 } from "../../geometry/geometry.js";
import { ParticleModel } from "../particleModel.js";
export class SnowModel extends ParticleModel {
    constructor() {
        super();
        this.force.y = 0.3;
    }
    update(particle) {
        super.update(particle);
    }
    render(particle, draw, worldScale) {
        let p = new Vec2(particle.point.x * worldScale, particle.point.y * worldScale);
        draw.circle(p, 2, 255, 255, 255);
    }
}
