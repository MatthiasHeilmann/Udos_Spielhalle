const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const port = 8080;

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

app.get('/' , (req, res) => {
    console.log("Got get request!")
    res.sendFile(__dirname + '/main.html');
});

app.get('/pingpong', (req, res) => {
    res.sendFile(__dirname + '/games/PingPong.html');
})

app.get('/tictactoe', (req, res) => {
    res.sendFile(__dirname + '/games/TicTacToe.html');
})