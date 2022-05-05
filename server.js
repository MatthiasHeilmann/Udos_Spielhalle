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

io.of('sv').on('connection', (socket) => {
    let isHost;
    sockets[socket.id] = {socket, name:"", isHost: false, connectedSocket: null};

    console.log("sv User connected: " + socket.id);

    socket.on('disconnect', () => {
        console.log("sv User disconnected: " + socket.id);
        // Disconnect connected socket
        sockets[sockets[socket.id].connectedSocket]?.disconnect();
    });

    socket.on('svSetName', (name) => {
        sockets[socket.id].name = name;
    });

    socket.on('svCreateOpenGame', () => {
        sockets[socket.id].isHost = true;
    });

    socket.on('svGetOpenGames', () => {
        let listHosts = [];
        for(let host in sockets){
            if(sockets[host].isHost && !sockets[host].connectedSocket)
                listHosts.push({name: sockets[host].name, hostId: host});
        }
        socket.emit('svSendOpenGames', listHosts);
    });

    socket.on('svSendAskJoinGame', (hostId) => {
        sockets[hostId].emit('svAskJoinGame', {name: socket.name, clientId: socket.id});
    });

    socket.on('svSendAnswerGameRequest', (clientId, allowJoin) => {
        sockets[clientId].emit('svAnswerGameRequest', allowJoin);
    });

    socket.on('svJoinGame', (hostId) => {
        sockets[socket.id].connectedSocket = hostId;
        sockets[hostId].connectedSocket = socket.id;
    });

    socket.on('svSendFire', (coordinates) => {
        sockets[sockets[socket].connectedSocket].emit('svFire', coordinates);
    });

    socket.on('svSendAnswer', (coordinates, result) => {
        sockets[sockets[socket].connectedSocket].emit('svAnswer', {coordinates, result});
    });
});
