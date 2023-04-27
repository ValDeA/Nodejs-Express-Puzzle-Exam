var socket = io.connect();

var oldt = null, newt = null;

function stopatch() {
	socket.emit('stopwatch', true);
}
function endStopatch() {
	socket.emit('endstopwatch', true);
}