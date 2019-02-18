const server = require('server');
const { get, socket} = server.router;
const { render } = server.reply;

const updateCounter = ctx => {
	ctx.io.emit('count', ctx.io.sockets.sockets.length);
}

const sendMessage = ctx => {
	ctx.io.emit('message', ctx.data);
};

server([
	get(ctx => render('index.html')),
	socket('connect', updateCounter),
	socket('disconnect', updateCounter),
	socket('message', sendMessage)
]);

console.log('Server running');