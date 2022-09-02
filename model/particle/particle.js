import { Vec2 } from "../geometry/geometry.js";
export class Particle {
    constructor(x, y, velocity, model) {
        this.point = new Vec2(x, y);
        this.velocity = velocity;
        this.model = model;
    }
    update() {
        this.model.update(this);
    }
    render(draw, worldScale) {
        this.model.render(this, draw, worldScale);
    }
}
