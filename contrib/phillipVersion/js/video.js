function g_videoDoStuffDelayed() { video.doStuffDelayed(); }
function onYouTubePlayerReady() { video.onPlayerReady(); }
function onytplayerStateChange(newState) {}
function updateytplayerInfo() {}

Video.prototype.setByData = function(videoData) {
    this.id = videoData.id;
    this.startsAtSeconds = videoData.startsAtSeconds;
    this.endsAtSeconds = videoData.endsAtSeconds;
}

Video.prototype.embed = function() {
    if (this.id == null) {
        console.log('Please set a video id first');
    }
    else {
        var params = {allowScriptAccess: 'always', bgcolor: '#ffffff', wmode: 'transparent'};
        var atts = {id: 'ytapiplayer'};
        var flashUrl = 'http://www.youtube.com/v/' + this.id +
                '?enablejsapi=1&playerapiid=ytplayer&version=3&controls=0&rel=0&iv_load_policy=3'
        swfobject.embedSWF( flashUrl, 'ytapiplayer','320px', '240px', '8', null, null, params, atts );
        this.doStuffDelayed();
    }
}

Video.prototype.doStuffDelayed = function() {
    if (typeof ytplayer != 'undefined') {
        this.durationSeconds = ytplayer.getDuration();

        if (!this.inited) {
            ytplayer.addEventListener('onStateChange', 'onPlayerStateChange');
            this.inited = true;
        }

        if (this.durationSeconds < 0 || this.durationSeconds > 1000000) {
            this.durationSeconds = 0;
            setTimeout('g_videoDoStuffDelayed()', 1000);
        }
        else {
            this.bytesTotal = ytplayer.getVideoBytesTotal();
            ytplayer.setVolume(this.normalVolume);
            if ( ytplayer.isMuted() ) { ytplayer.unMute(); }
        }
    }
    else {
        setTimeout('g_videoDoStuffDelayed()', 500);
    }
}

Video.prototype.onPlayerReady = function() {
    ytplayer = document.getElementById('ytapiplayer');
    if (this.startsAtSeconds > 0) { ytplayer.loadVideoById(this.id, this.startsAtSeconds); }
    else { ytplayer.loadVideoById(this.id); }
    setTimeout('g_videoDoStuffDelayed()', 500);
}

Video.prototype.powerUpVolume = function() {
    this.volume = this.highestVolume;
}

Video.prototype.killVolume = function() {
    this.doKillVolume = true;
}

Video.prototype.handleVolumeAutoDecrease = function() {
    if (this.inited) {
        var volumeOld = Math.floor(this.volume);
        if (this.volume == null) { this.volume = this.normalVolume; }

        if (this.volume > this.normalVolume) { this.volume -= 1; }
        else if (this.volume >= this.normalVolume - 5) { this.volume -= .1; }
        else { this.volume -= 1; }

        if (this.volume < this.minimumVolume) { this.volume = this.minimumVolume; }
        // console.log(this.volume);

        if (this.doKillVolume) {
            this.volume = 0;
            this.doKillVolume = false;
        }

        var volumeNew = Math.floor(this.volume);
    
        if (volumeNew != volumeOld) {
            if (volumeNew > this.highestVolume) { volumeNew = this.highestVolume; }
    
            if (typeof ytplayer != 'undefined') {
                ytplayer.setVolume(volumeNew);
            }
        }
    }
}

function Video() {
    this.inited = false;
    this.id = null;
    this.startsAtSeconds = 0;
    this.endsAtSeconds = null;
    this.durationSeconds = null;
    this.bytesTotal = null;
    this.minimumVolume = 0;
    this.normalVolume = 75;
    this.highestVolume = 100;
    this.volume = null;
    this.doKillVolume = null;
}
