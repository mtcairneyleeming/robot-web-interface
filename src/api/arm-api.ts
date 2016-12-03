var SerialPort = require('serialport');


export module serial {

    export var port = new SerialPort('/dev/ttyACM1', {
        baudRate: 19200
    });
    export var writeServos = function (base: number, shoulder: number, elbow: number, claw: number) {
        // in order base, shoulder, elbow, claw
        if (arguments.length !== 4) {
            console.error("Incorrect number of arguments");
            return -1;
        } else {
            this.port.write(Math.round(base) + "," + Math.round(shoulder) + "," + Math.round(elbow) + "," + Math.round(claw) + ",\n");
            console.log(Math.round(base) + "," + Math.round(shoulder) + "," + Math.round(elbow) + "," + Math.round(claw) + ",");
        }
    };
}