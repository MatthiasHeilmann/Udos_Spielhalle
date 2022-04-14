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
    res.sendFile(__dirname + '/main.html');
});

app.get('/schiffeversenken', (req, res) => {
    res.sendFile(__dirname + '/games/schiffeversenken.html');
});

app.get('/svGetOpenGames', (req, res) => {

});

app.put('/svCreateOpenGame', (req, res) => {

});

app.post('/svConnectToGame', (req, res) => {

});