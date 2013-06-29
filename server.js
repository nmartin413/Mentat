var express = require('express');
var http = require('http');
var _ = require('underscore');

var app = express();
var server = http.createServer(app);
server.listen(3033);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.io = require('socket.io').listen(server);

var logPrefix = "   BrainTank - ";

var BTLink = require('./link.js');
var links = [];

app.io.on('connection', function (socket) {
	var newLink = BTLink.create(socket);
	links.push(newLink);

	socket.emit('init', 'success');
	broadcastContextUpdate();

	socket.on('didUpdateState', _.partial(didUpdateState, socket));

	socket.on('disconnect', _.partial(didDisconnect, socket));

});

function didUpdateState(socket, state) {
	if (!socket) throw 'socket was null';
	console.log(logPrefix + 'updating state... \n\t new state: ' + JSON.stringify(state));
	
	updateStateForSocket(state, socket);
	broadcastContextUpdate();
}

function didDisconnect(socket) {
	if (!socket) throw 'socket was null';
	console.log(logPrefix + 'closing socket...');

	var link = getLinkForSocket(socket);
	links = _(links).without(link);
	broadcastContextUpdate();
}

function updateStateForSocket(state, socket) {
	var link = getLinkForSocket(socket);
	link.state = state;
}

function getLinkForSocket(socket) {
	return _(links).detect(function (link) {
		return link.socket === socket;
	});
}

function broadcastContextUpdate() {
	console.log(logPrefix + 'broadcasting context update to ' + links.length + ' links');
	var currentContext = getContext();

	_(links).each(function (link) {
		link.socket.emit('didUpdateContext', currentContext);
	});

}

function getMentalStateCounts() {
	var groupedLinks = _(links).groupBy(function (link) {
		return link.state.mentalState;
	});

	var counts = {};
	_(groupedLinks).each(function (linkGroup, index) {
		counts[index] = linkGroup.length;
	});

	return _(counts).defaults({
		"0": 0,
		"1": 0,
		"2": 0
	});
}

function getContext() {
	return {
		connections: links.length,
		mentalStateCounts: getMentalStateCounts()
	};
}