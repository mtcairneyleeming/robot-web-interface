// socket.io connection
var socket = io();


var joystick = nipplejs.create({
    zone: document.getElementById('joystick'),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'red'
});
joystick.on('move', function(useless, data) {
    socket.emit('joystick', {
        distance: data.distance,
        radians: data.angle.radian
    })
})

function init() {
    // Connect to ROS.
    var ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090'
    });
    div = $('#map');
    //div.css('margin', '10pt');
    var width = div.width();
    var height = div.height();
    viewer = new ROS2D.Viewer({
        divID: 'map',
        width: width,
        height: height,
        //background: '#DDDDDD'
    });
    gridClient = new ROS2D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
    });
    // Scale the canvas to fit to the map
    gridClient.on('change', function(map_origin) {
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    });
    $(window).resize(function(e) {
        var cX = div.width();
        var cY = div.height();
        var iY = gridClient.currentGrid.width;
        var iX = gridClient.currentGrid.height;
        console.log(cX, (iY * (cX / iX)))

        // $('#viewer-canvas').prop('width', cX)
        // $('#viewer-canvas').prop('height', (iY * (cX / iX)))
        $('#viewer-canvas').width(cX)
        $('#viewer-canvas').height(iY * (cX / iX))
            //viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    });

    // // Create the main viewer.
    // var viewer = new ROS2D.Viewer({
    //     divID: 'map',
    //     width: 600,
    //     height: 500
    // });

    // // Setup the map client.
    // var gridClient = new ROS2D.OccupancyGridClient({
    //     ros: ros,
    //     rootObject: viewer.scene
    // });
    // // Scale the canvas to fit to the map
    // gridClient.on('change', function() {
    //     viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    // });
}