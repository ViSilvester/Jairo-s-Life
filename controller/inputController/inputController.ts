import { Game } from "../../model/game/game.js";
import { enumWeater } from "../weatherController/enum_weather.js";

export class InputController {

    private game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    listen(): void {
        addEventListener("keypress", (ev) => { this.handleKeyboardPress(ev) });
    }

    private handleKeyboardPress(ev: KeyboardEvent): void {

        switch (ev.key) {
            case "1":
                this.game.weatherController.setWeather(enumWeater.snow);
                break;
            case "2":
                this.game.weatherController.setWeather(enumWeater.rain);
                break;
            case "3":
                this.game.weatherController.setWeather(enumWeater.sun);
                break;
        }
    }

}