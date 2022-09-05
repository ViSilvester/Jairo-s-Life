import "snow_theme.mp3"


export class AudioController {




    snowMusic = document.getElementById("snow_theme") as HTMLAudioElement;
    sunMusic = document.getElementById("sun_theme_1") as HTMLAudioElement;
    rainMusic = document.getElementById("sun_theme_2") as HTMLAudioElement;
    isPlaying = false;
    playSnowMusic() {
        try {
            if (!this.isPlaying) {
                this.snowMusic.play();
                this.snowMusic.onended = () => {
                    this.isPlaying = false;
                }
                this.isPlaying = true;
            }
        }
        catch (e) {
            this.isPlaying = false;

        }
    }

    playSunMusic() {
        try {
            if (!this.isPlaying) {
                this.sunMusic.play();
                this.sunMusic.onended = () => {
                    this.isPlaying = false;
                }
                this.isPlaying = true;
            }
        }
        catch (e) {
            this.isPlaying = false;

        }
    }
    playRainMusic() {
        try {
            if (!this.isPlaying) {
                this.rainMusic.play();
                this.rainMusic.onended = () => {
                    this.isPlaying = false;
                }
                this.isPlaying = true;
            }
        }
        catch (e) {
            this.isPlaying = false;

        }
    }

}