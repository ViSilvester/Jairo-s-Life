import { Vec2, Vec3 } from "../../model/geometry/geometry.js";
import { Particle } from "../../model/particle/particle.js";
import { RainModel } from "../../model/particleModel/rainModel/rainModel.js";
import { SnowModel } from "../../model/particleModel/snowModel/snowModel.js";
import { enumWeater } from "./enum_weather.js";
export class WeatherController {
    constructor() {
        this.wind = new Vec2(0, 0);
        this.particles = [];
        this.setWeather(enumWeater.snow);
    }
    setWeather(weather) {
        this.currentWeather = weather;
        switch (weather) {
            case enumWeater.snow:
                this.currentModel = new SnowModel();
                this.backgroundColor = new Vec3(100, 100, 100);
                this.spawnRate = 0.1;
                this.spawnQuantity = 20;
                this.turbulenceRange = 0.025;
                break;
            case enumWeater.rain:
                this.currentModel = new RainModel();
                this.backgroundColor = new Vec3(100, 100, 100);
                this.spawnRate = 0.5;
                this.spawnQuantity = 50;
                this.turbulenceRange = 0;
                break;
            case enumWeater.sun:
                this.currentModel = new RainModel();
                this.backgroundColor = new Vec3(31, 138, 224);
                this.spawnRate = 0;
                this.spawnQuantity = 0;
                break;
        }
    }
    spawn(worldWidth) {
        if (Math.random() < this.spawnRate) {
            const quantity = (Math.random() + 0.5) * this.spawnQuantity;
            if (this.particles.length >= 2000) {
                this.particles.splice(0, quantity);
            }
            for (var i = 0; i < quantity; i++) {
                var rx = (Math.random() * worldWidth * 2) - (worldWidth / 2);
                var ry = 0 - (Math.random() * 10);
                var rtx = (Math.random() - 0.5) * this.turbulenceRange;
                var rty = (Math.random() - 0.5) * this.turbulenceRange;
                this.particles.push(new Particle(rx, ry, new Vec2(rtx, rty), this.currentModel));
            }
        }
    }
    update() {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].point.y > 55) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }
    setWind(wind) {
        this.wind.x = wind.x;
        this.wind.y = wind.y;
        if (this.wind.x > 1) {
            this.wind.x = 1;
        }
        if (this.wind.x < -1) {
            this.wind.x = -1;
        }
        this.currentModel.setForce(new Vec2(wind.x, this.currentModel.force.y));
    }
    render(draw, worldScale) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].render(draw, worldScale);
        }
    }
}
