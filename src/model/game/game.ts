import { InputController } from "../../controller/inputController/inputController.js";
import { WeatherController } from "../../controller/weatherController/weatherController.js";
import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";
import { Terrain } from "../terrain/terrain.js";


export class Game {

    draw: Draw;
    terrain: Terrain;
    worldScale: number;
    weatherController: WeatherController;
    inputController: InputController;


    constructor() {
        this.draw = new Draw();
        this.terrain = new Terrain(10);
        this.worldScale = 10;
        this.weatherController = new WeatherController();
        this.inputController = new InputController(this);
    }

    create(): void {
        // vento randomico
        this.weatherController.setWind(new Vec2((Math.random() - 0.5) * 0.25, 0));
        // Cria chão
        this.terrain.create();
        // Ouve teclado
        this.inputController.listen();

    }

    update(): void {

        if (Math.random() < 0.001) {
            this.weatherController.setWind(
                new Vec2((Math.random() - 0.5) * 0.25, 0)
            );
        }
        this.weatherController.spawn(this.draw.width / this.worldScale);
        this.weatherController.update();

    }

    render(): void {

        this.draw.fillBackgroudColor(
            this.weatherController.backgroundColor.x,
            this.weatherController.backgroundColor.y,
            this.weatherController.backgroundColor.z
        );

        this.weatherController.render(this.draw, this.worldScale);

        this.terrain.render(this.draw, this.worldScale);
    }


    gameLoop(): void {
        this.update();
        this.render();
        requestAnimationFrame(() => { this.gameLoop() })

    }
}