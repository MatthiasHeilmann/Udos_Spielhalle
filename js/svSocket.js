const socket = io('/sv');

socket.on('disconnect', () => {
    alert("Der andere spieler hat die verbindung abgebrochen");
})

function connect(config){
    console.log("Connect as " + config.name + " (asHost: " + config.asHost + ")");

    socket.emit('svSetName', config.name);

    socket.on('svFire', (coordinates) => {
        // TODO Koordinaten checken und antworten
        coordinates.x;
        coordinates.y;

        socket.emit('svSendAnswer', {coordinates, result: "miss"});
    });

    socket.on('svAnswer', (answer) => {
        // TODO result checken und Koordinaten markieren
        answer.coordinates;
        answer.result;
    });

    if(config.asHost){
        socket.on('svAskJoinGame', (client) => {
            // TODO Fragen ob der joinen erlaubt ist und antworten
            client.name;
            client.clientId;

            socket.emit('svSendAnswerGameRequest', false);
        });

        socket.emit('svCreateOpenGame');
    }
    else{
        socket.on('svSendOpenGames', (listHosts) => {
            // TODO Hosts in Liste darstellen
        });

        socket.on('svAnswerGameRequest', (allowJoin) => {
            // TODO Antwort verwalten
        });

        socket.emit('svGetOpenGames');
    }
}