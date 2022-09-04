export class AudioController {

    snowMusic = new Audio("../../../assets/snow_theme.mp3");
    sunMusic = new Audio("../../../assets/sun_theme_1.mp3");
    rainMusic = new Audio("../../../assets/sun_theme_2.mp3");
    isPlaying = false;

    playSnowMusic() {
        if (!this.isPlaying) {
            this.snowMusic.play();
            this.snowMusic.onended = () => {
                this.isPlaying = false;
            }
            this.isPlaying = true;
        }
    }

    playSunMusic() {
        if (!this.isPlaying) {
            this.sunMusic.play();
            this.sunMusic.onended = () => {
                this.isPlaying = false;
            }
        }
    }
    playRainMusic() {
        if (!this.isPlaying) {
            this.rainMusic.play();
            this.rainMusic.onended = () => {
                this.isPlaying = false;
            }
        }
    }

}