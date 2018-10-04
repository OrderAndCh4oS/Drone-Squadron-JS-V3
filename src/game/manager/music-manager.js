import music from '../music'

export default class MusicManager {

    constructor(songs) {
        this.sounds = {}; // "piu": "sounds/piu" -- If you want to play: this.play( "piu" );
        this.songs = music;
        this.loop = 0; // current loop number
        this.maxloop = 4; // MAGIC NUMBER ( I't how many times song plays before changing )
        this.loadSounds();
        this.createMainAudio(); // Audio stream for songs ( BG )
        this.listenToMusic();
        //console.log( this.songs ); CHECK THIS
        //console.log( this.audio ); MEDIA ERROR 4 ( NOT SUPPORTED FORMAT )
    }

    loadSounds() {
        for(let sound in this.sounds) {
            this.sounds[sound] = MusicManager.load(this.sounds[sound]);
        }
    }

    createMainAudio() {
        this.audio = document.createElement('audio');
        this.audio.onended = () => {
            this.loop++;
            if(this.loop > this.maxloop) {
                this.playlist.shift();
            }
            if(!this.playlist.length) {
                this.playlist = this.songs;
            }
            this.dom.currentTime = 0;
            this.audio.src = this.playlist[0];
            this.audio.play();
        };
    }

    listenToMusic() {
        this.playlist = this.songs;
        this.audio.src = this.playlist[0];
        this.audio.play();
    }

    load(sound) {
        let a = document.createElement('audio');
        a.src = sound;

        return a;
    }

    start() {
        this.audio.fastSeek(0);
        this.audio.play();
    };

    stop() {
        this.audio.pause();
        this.audio.fastSeek(0);
    }

    play(sound) {
        this.sounds[sound].play();
    }
}
