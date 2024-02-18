document.addEventListener('DOMContentLoaded', (event) => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('update', function(data) {
        document.getElementById('content').innerHTML = data.message;
    });
});
