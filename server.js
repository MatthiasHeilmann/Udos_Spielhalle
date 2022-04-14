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

app.get('/' , (req, res) => {
    console.log("Got get request!")
    res.sendFile(__dirname + '/main.html');
});