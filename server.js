const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const app = express();

// 서버 설정
app.use(bodyParser.urlencoded({ extended: false }));
// css 경로
app.use(express.static('css'));
app.use(express.static('js'));

// 서버 실행
const httpServer = http.createServer(app).listen(65001, () => {
	console.log('Server Running!');
});

// 변수 선언
var oldt = null, newt = null;

// 소켓 생성
const io = socketio.listen(httpServer);
io.sockets.on('connection', (socket) => {
	console.log('Socket Connected!');

	socket.on('stopwatch', () => {
		oldt = new Date();
	});
	socket.on('endstopwatch', (time) => {
		newt = new Date();
		
		var watch = newt.getTime() - oldt.getTime();
		socket.emit('stopwatch', time);
	});
});

/* get 처리 부분 */
app.get('/', (req, res) => {
	fs.readFile('finalTerm_index.html','utf8',(error, data) => {
	res.writeHead(200, {'Content-Type':'text/html;chearset=utf8'});
	res.end(data);
	});
});

