import { config } from '../config';


export var joystickPubInit = function (io: any, ros: any) {
    io.on('connection', function (socket) {
        console.info("Socket.io connection established");
        socket.on('joystick', function (data) {
            //console.log(data);
            if (data.distance === 0 && data.radians === 0) {
                let msg = {
                    linear: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    angular: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                };
                ros.cmdVel.publish(msg);
                return;
            }

            //convert to cartesian 
            let x = data.distance * Math.cos(data.radians);
            let y = data.distance * Math.sin(data.radians);

            // joystick control scheme:
            // y - angular velocity
            // x - radial velocity - left anticlockwise, right clockwise

            // message for publishing
            let msg = {
                linear: {
                    x: (config.node.maxLinearSpeed * y / 50),
                    y: 0,
                    z: 0
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: (config.node.maxRotationalSpeed * x / 50)
                }
            };

            ros.cmdVel.publish(msg);
        });
    });
};
