const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const port = 8080;
const io = require("socket.io")(server);
// To store all sockets that are currently connected to this servers io
const sockets = {};
// Starting webserver
server.listen(port, function(){
    console.log('Webserver läuft auf Port %d', port);
});

app.use(express.static(__dirname));
app.use(express.json());
app.use(function timeLog(req, res, next) {
    console.log(new Date().toLocaleString("de-DE") + ": " + req.originalUrl);
    next();
});

/**
 * TODO Learn https://stackoverflow.com/questions/29446462/nodejs-how-to-update-client-after-external-program-has-returned
 * For socket.io.
 * Lässt den server mit einem client verbinden. Antworten zu jeder zeit ohne gebraucht von fetch o.ä.
 */
app.get('/' , (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.get('/schiffeversenken', (req, res) => {
    res.sendFile(__dirname + '/games/schiffeversenken.html');
});

io.on('connection', (socket) => {
    let isHost;
    sockets[socket.id] = {socket, connectedSocket: null};
    console.log("User connected: " + socket.id);

    socket.on('disconnect', () => {
        console.log("User disconnected: " + socket.id);
    });

    socket.on('svSetState', (state) => {
        isHost = (state === 'host');
        console.log(socket.id + " set state to " + state + " (" + isHost + ")");
    })

    socket.on('svSocketTest', (text) => {
        console.log("Got new connection!: " + text);
    });

    socket.on('svCreateOpenGame', (hostId) => {

    });

    socket.on('svGetOpenGames', () => {

    });

    socket.on('svAskJoinGame', (hostId) => {

    });

    socket.on('svAnswerGameRequest', (clientId, allowJoin) => {

    });

    socket.on('svJoinGame', (hostId) => {

    });
})
