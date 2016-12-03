var nodezmq = require('zmq');
import { config } from '../config';

export var ZMQInit = function () {

    var socket = nodezmq.socket('sub');
    console.info("Connecting to ZMQ");
    socket.subscribe("");
    socket.connect(config.zmq.address);
    return socket;
};
