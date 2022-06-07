const socket = io('/sv');

const Call = {
    AnswerGameRequest: "answerGameRequest",
    SendOpenGames: "sendOpenGames",
    GameRequest: "gameRequest",
    Fire: "fire",
    Answer: "answer"
};

/**
 * Defines on what call the socket should currently listen to
 * @type {String}
 */
let listenCall = "";
/**
 * @type {{hostId: number, accepted: boolean}}
 */
let selectedHost = {};

socket.on('disconnect', () => {
    lDisconnect();
})

function sConnect(config){
    console.log("Connect as " + config.name + " (asHost: " + config.asHost + ")");

    socket.emit('svSetName', config.name);

    socket.on('svFire', (coordinates) => {
        if(listenCall !== Call.Fire) return;
        console.log("svFire on " + listenCall);
        lGetFire(coordinates)
        console.log("Got Fire")
        console.log(coordinates)
    });

    socket.on('svAnswer', (answer) => {
        if(listenCall !== Call.Answer) return;
        lGetAnswer(answer.coordinates, answer.result);
        console.log("Got Answer")
        console.log(answer);
    });

    if(config.asHost){
        socket.on('svGameRequest', (client) => {
            if(listenCall !== Call.GameRequest) return;
            lOnGetGameRequest(client);
        });

        socket.emit('svCreateOpenGame');
        sListenOn(Call.GameRequest);
    }
    else{
        socket.on('svSendOpenGames', (hostList) => {
            if(listenCall !== Call.SendOpenGames) return;
            lOnGetOpenGames(hostList);
        });

        socket.on('svAnswerGameRequest', (allowJoin) => {
            if(listenCall !== Call.AnswerGameRequest) return;
            if(allowJoin) {
                socket.emit('svJoinGame', selectedHost.hostId);
                lOnConnection();
            }
        });

        sReloadOpenGames()
    }
}

function sListenOn(call){
    console.log("Set call " + call);
    listenCall = call;
}

function sReloadOpenGames(){
    sListenOn(Call.SendOpenGames);
    socket.emit('svGetOpenGames');
}

function sSendGameRequest(hostId){
    socket.emit('svSendGameRequest', hostId);
    selectedHost = {hostId, accepted: false};
    listenCall = Call.AnswerGameRequest;
}

function sSendAnswerGameRequest(clientId, answer = false){
    socket.emit('svSendAnswerGameRequest', clientId, answer);
    if(answer){
        lOnConnection();
    }
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