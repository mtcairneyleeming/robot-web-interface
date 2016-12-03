import * as sio from 'socket.io';

export var init = function (app) {
    var io = sio();
    app.socket = io;
};
