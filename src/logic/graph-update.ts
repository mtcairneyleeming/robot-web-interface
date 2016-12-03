export function graphUpdateInit(io: any, socket: any) {

    socket.on('message', function (data) {
        var graph = JSON.parse(data);
        //console.log(graph.graph)
        io.emit('graph_update', graph);

    });
}
