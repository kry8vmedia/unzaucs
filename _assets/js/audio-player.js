// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js
//= require html5media.min

// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '//res.cloudinary.com/krvmedia/video/upload/br_192/q_100/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "STC The Producer - Really Dope Drums",
                "length": "00:28",
                "file": "audio/stc-really-dope-drums"
            }, {
                "track": 2,
                "name": "STC The Producer - Dreams",
                "length": "04:23",
                "file": "audio/stc-dreams"
            }, {
                "track": 3,
                "name": "STC The Producer - What You Love (Prod. by Bacci x STC The Producer)",
                "length": "03:12",
                "file": "v1481567069/audio/stc-what-you-love"
            }, {
                "track": 4,
                "name": "STC The Producer - For My Father",
                "length": "03:09",
                "file": "audio/stc-for-my-father"
            }, {
                "track": 5,
                "name": "STC The Producer - Noise",
                "length": "03:09",
                "file": "audio/stc-noise"
            }, {
                "track": 6,
                "name": "STC The Producer - Ubwali (Panda Cover)",
                "length": "04:11",
                "file": "audio/stc-ubwali-panda-cover"
            }],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing:');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused -');
            }).bind('ended', function () {
                npAction.text('Paused - ');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});