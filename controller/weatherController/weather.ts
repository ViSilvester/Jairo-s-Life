
import { Draw } from "../../model/draw/draw.js";
import { Vec2 } from "../../model/geometry/geometry.js";
import { Particle } from "../../model/particle/particle.js";
import { ParticleModel } from "../../model/particleModel/particleModel.js";
import { RainModel } from "../../model/particleModel/rainModel/rainModel.js";
import { SnowModel } from "../../model/particleModel/snowModel/snowModel.js";
import { enumWeater } from "./enum_weather.js";

export class WeatherController {

    particles: Array<Particle>;
    wind: Vec2;
    currentWeather: enumWeater;
    currentModel: ParticleModel;
    spawnRate: number;
    spawnQuantity: number;


    constructor() {
        this.wind = new Vec2(0, 0);
        this.particles = [];
        this.currentWeather = enumWeater.snow;
        this.currentModel = new RainModel();
        this.spawnRate = 0.5;
        this.spawnQuantity = 50;
    }

    setWeather(weather: enumWeater) {

        this.currentWeather = weather;
        switch (weather) {
            case enumWeater.snow:
                this.currentModel = new SnowModel();
                this.spawnRate = 0.1;
                this.spawnQuantity = 20;
                break;
            case enumWeater.rain:
                this.currentModel = new RainModel();
                this.spawnRate = 0.5;
                this.spawnQuantity = 50;
                break;
        }
    }

    spawn(worldWidth: number): void {

        if (Math.random() < this.spawnRate) {

            const quantity = (Math.random() + 0.5) * this.spawnQuantity;

            if (this.particles.length >= 2000) {
                this.particles.splice(0, quantity);
            }

            for (var i = 0; i < quantity; i++) {
                this.particles.push(
                    new Particle(
                        (Math.random() * worldWidth * 3) - worldWidth,
                        0 - (Math.random() * 10),
                        new Vec2(this.wind.x, 0.2),
                        this.currentModel
                    )
                )
            }
        }
    }

    update(): void {

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }

    setWind(wind: Vec2) {

        this.wind.x = wind.x;
        this.wind.y = wind.y;

        if (this.wind.x > 1) {
            this.wind.x = 1;
        }
        if (this.wind.x < -1) {
            this.wind.x = -1;
        }
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].velocity.x = this.wind.x;
        }
    }

    render(draw: Draw, worldScale: number) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].render(draw, worldScale);
        }
    }

}