import { enumWeater } from "../weatherController/enum_weather.js";
export class InputController {
    constructor(game) {
        this.game = game;
    }
    listen() {
        addEventListener("keypress", (ev) => { this.handleKeyboardPress(ev); });
    }
    handleKeyboardPress(ev) {
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
