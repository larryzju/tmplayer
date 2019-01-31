class MyAudio {
    constructor(src) {
        this.audio = new Audio(src);
    }

    updateStatus() {
        var status = document.getElementById('status');
        var currentTime = document.getElementById('currentTime');
        var endTime = document.getElementById('endTime');
        var volume = document.getElementById('volume');

        var s = this.getStatus();
        status.innerHTML = s.status;
        currentTime.innerHTML = s.currentTime;
        endTime.innerHTML = s.endTime;
        volume.innerHTML = s.volume;
    }

    getStatus() {
        var s = {};
        s.status = this.audio.src;
        s.currentTime = this.audio.currentTime;
        s.endTime = this.audio.duration;
        s.volume = this.audio.volume;
        return s;
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
        if(evt.key === " ") {
            this.pauseOrPlay();
        } else if(evt.key === "ArrowLeft") {
            this.backward();
        } else if(evt.key === "ArrowRight") {
            this.forward();
        } else if(evt.key === "ArrowUp") {
            this.increaseVolume();
        } else if(evt.key === "ArrowDown") {
            this.decreaseVolume();
        } else {
            console.log(evt);
        }
    }
}

window.onload = function() {
    var audio = new MyAudio("sample.mp3");
    var main = document.getElementById('main');
    main.focus();
    main.onkeydown = function(evt){audio.handlerKeyPress(evt)};
    window.setInterval(function(){audio.updateStatus()}, 200);
}

