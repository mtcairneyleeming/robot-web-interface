let rosgraph = new sigma('rosgraph');;
var socket = io.connect();
var currServices = [] //currently displayed services
socket.on("graph_update", function(data) {
    rosgraph.graph.read(data.graph)
    console.log(data.services)
    rosgraph.graph.nodes().forEach(function(node, i, a) {
        // On a circle:
        node.x = Math.cos(Math.PI * 2 * i / a.length);
        node.y = Math.sin(Math.PI * 2 * i / a.length);
        // Default size:
        node.size = 1;
    });
    rosgraph.refresh()
    for (let i = 0; i < data.services.length; i++) {
        service = data.services[i]
        if (currServices.indexOf(service) == -1) {
            $('#services_table').append("<tr><td>" + service + "</td></tr>")
            currServices.push(service)
        }
    }
    for (let service in currServices) {
        if (data.services.indexOf(service) == -1) {
            $('div:contains(service)').remove()
        }
    }

})
var init = function() {
    window.open("/mic", 'microphone', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=300,height=225');
};