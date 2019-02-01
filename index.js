class MyAudio {
    constructor(src) {
        this.audio = new Audio(src);
        this.keymap = {
            " ": this.pauseOrPlay,
            "ArrowLeft": this.backward,
            "ArrowRight": this.forward,
            "ArrowUp": this.increaseVolume,
            "ArrowDown": this.decreaseVolume
        };
    }

    updateStatus() {
        var status = document.getElementById('status');
        var currentTime = document.getElementById('currentTime');
        var endTime = document.getElementById('endTime');
        var volume = document.getElementById('volume');
        var progress = document.getElementById('progress');

        status.innerHTML = this.audio.src;
        currentTime.innerHTML = this.audio.currentTime;
        endTime.innerHTML = this.audio.duration;
        volume.innerHTML = Math.round(this.audio.volume*100);
        progress.value = isNaN(this.audio.duration) ? 0: this.audio.currentTime / this.audio.duration;
    }

    pauseOrPlay() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    backward() {
        var to = this.audio.currentTime - 10;
        this.audio.currentTime = to >= 0 ? to : 0;
    }

    forward() {
        var to = this.audio.currentTime + 10;
        this.audio.currentTime = to <= this.audio.duration ? to : this.audio.duration;
    }

    increaseVolume() {
        this.audio.volume = Math.min(1.0, this.audio.volume + 0.05);
    }

    decreaseVolume() {
        this.audio.volume = Math.max(0.0, this.audio.volume - 0.05);
    }

    handlerKeyPress(evt) {
        var handle = this.keymap[evt.key] || (() => console.log(evt));
        handle.bind(this)();
    }
}

window.onload = function() {
    var audio = new MyAudio("sample.mp3");
    var main = document.getElementById('main');
    main.focus();
    main.onkeydown = audio.handlerKeyPress.bind(audio);
    window.setInterval(audio.updateStatus.bind(audio), 200);
}
