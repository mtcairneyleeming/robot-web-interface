var ROSLIB = require('roslib');
var ROS = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});
var cmdvel = new ROSLIB.Topic({
    ros: ROS,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
});

export module ros {

    export var cmdVel = cmdvel;

    export interface Twist {
        linear: {
            x: number,
            y: number,
            z: number
        };
        angular: {
            x: number,
            y: number,
            z: number
        };
    };
}


