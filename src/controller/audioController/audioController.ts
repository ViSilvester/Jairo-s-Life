export class AudioController {

    snowMusic = document.getElementById("snow_theme") as HTMLAudioElement;
    sunMusic = document.getElementById("sun_theme_1") as HTMLAudioElement;
    rainMusic = document.getElementById("sun_theme_2") as HTMLAudioElement;
    isPlaying = false;

    async playSnowMusic() {

        if (!this.isPlaying && this.snowMusic) {
            try {
                await this.snowMusic.play();
                this.isPlaying = true;
            }
            catch (e) {
                this.isPlaying = false;
            }
        }

        this.snowMusic.onended = () => {
            this.isPlaying = false;
        };
    }

    async playSunMusic() {
        if (!this.isPlaying) {
            try {
                await this.sunMusic.play();
                this.isPlaying = true;
            }
            catch (e) {
                this.isPlaying = false;
            }
        }

        this.sunMusic.onended = () => {
            this.isPlaying = false;
        };
    }

    async playRainMusic() {

        if (!this.isPlaying) {
            try {
                await this.rainMusic.play();
                this.isPlaying = true;
            }
            catch (e) {
                this.isPlaying = false;
            }
        }

        this.rainMusic.onended = () => {
            this.isPlaying = false;
        }
    }
}