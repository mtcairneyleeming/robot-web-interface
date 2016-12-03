var ogg = require('ogg');
var opus = require('node-opus');

var Speaker = require('speaker');

import { config } from '../config';

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

var text_to_speech = new TextToSpeechV1({
    username: config.watson.username,
    password: config.watson.password
});

export var tts = function (text: string, callback: Function) {

    var params = {
        text: text,
        voice: 'en-GB_KateVoice'
    };

    let oggDecoder = new ogg.Decoder();

    oggDecoder.on('stream', function (stream) {
        // speaker options
        var speaker = new Speaker({
            channels: 1,
            sampleRate: 48000,
            bitDepth: 16,
            float: false,
            signed: true,
            gain: 0,
            preSkip: 156,
            version: 1,
            lowWaterMark: 0,
            highWaterMark: 0
        });


        var opusDecoder = new opus.Decoder();

        // the "format" event contains the raw PCM format
        opusDecoder.on('format', function (format) {

            // pipe to node-speaker
            opusDecoder.pipe(speaker);

            // when completed, callback
            speaker.on('flush', function () {
                callback();
            });

        });


        // an "error" event will get emitted if the stream is not a Vorbis stream
        // (i.e. it could be a Theora video stream instead)
        opusDecoder.on('error', console.error);

        stream.pipe(opusDecoder);
    });

    text_to_speech.synthesize(params).pipe(oggDecoder); 


};