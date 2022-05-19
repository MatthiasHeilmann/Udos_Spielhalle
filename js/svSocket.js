const socket = io('/sv');

const Call = {
    AnswerGameRequest: "answerGameRequest",
    SendOpenGames: "sendOpenGames",
    AskJoinGame: "askJoinGame",
    Fire: "fire",
    Answer: "answer"
};

/**
 * Defines on what call the socket should currently listen to
 * @type {String}
 */
let listenCall = "";
let selectedHost = 0;

socket.on('disconnect', () => {
    lDisconnect();
})

function sConnect(config){
    console.log("Connect as " + config.name + " (asHost: " + config.asHost + ")");

    socket.emit('svSetName', config.name);

    socket.on('svFire', (coordinates) => {
        if(listenCall !== Call.Fire) return;
        lGetFire(coordinates)
    });

    socket.on('svAnswer', (answer) => {
        if(listenCall !== Call.Answer) return;
        lGetAnswer(answer.coordinates, answer.result);
    });

    if(config.asHost){
        socket.on('svGameRequest', (client) => {
            if(listenCall !== Call.AskJoinGame) return;
            lOnConnectRequest(client);
        });

        socket.emit('svCreateOpenGame');
    }
    else{
        socket.on('svSendOpenGames', (listHosts) => {
            if(listenCall !== Call.SendOpenGames) return;
            // TODO Hosts in Liste darstellen
        });

        socket.on('svAnswerGameRequest', (allowJoin) => {
            if(listenCall !== Call.AnswerGameRequest) return;
            socket.emit('svJoinGame', selectedHost);
        });

        sListenOn(Call.SendOpenGames);
        socket.emit('svGetOpenGames');
    }
}

function sListenOn(call){
    listenCall = call;
}

function sSendGameRequest(hostId){
    socket.emit('svSendGameRequest', hostId);
    selectedHost = hostId;
    listenCall = Call.AnswerGameRequest;
}

function sSendAnswerGameRequest(clientId, answer = false){
    socket.emit('svSendAnswerGameRequest', clientId, answer);
}

function sSendFire(coordinates){
    socket.emit(`svSendFire`, coordinates);
}

function sSendAnswer(coordinates, result){
    socket.emit('svSendAnswer', {coordinates, result});
}

function sDisconnect(){
    socket.disconnect();
}