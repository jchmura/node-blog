/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var logger = require('log4js').getLogger('socketio');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
	// When the client emits 'info', this listens and executes
	socket.on('info', function (data) {
		logger.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
	});

	// Insert sockets below
	require('../api/story/story.socket').client(socket);
	require('../api/media/media.socket').client(socket);
	require('../api/news/news.socket').client(socket);
}

module.exports = function (socketio) {
	// socket.io (v1.x.x) is powered by debug.
	// In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
	//
	// ex: DEBUG: "http*,socket.io:socket"

	// We can authenticate socket.io users and access their token through socket.handshake.decoded_token
	//
	// 1. You will need to send the token in `client/components/socket/socket.service.js`
	//
	// 2. Require authentication here:
	// socketio.use(require('socketio-jwt').authorize({
	//	 secret: config.secrets.session,
	//	 handshake: true
	// }));

	socketio.on('connection', function (socket) {
        var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
		socket.address = ip + ':' + socket.handshake.address.port;
		socket.connectedAt = new Date();

		// Call onDisconnect.
		socket.on('disconnect', function () {
			onDisconnect(socket);
            logger.info('[' + socket.address + '] DISCONNECTED');
		});

		// Call onConnect.
		onConnect(socket);
        logger.info('[' + socket.address + '] CONNECTED');
    });

    // Register global socketio hooks
    require('../api/story/story.socket').global(socketio);
    require('../api/news/news.socket').global(socketio);

};
