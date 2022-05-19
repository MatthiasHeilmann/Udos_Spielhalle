import {Vector, Ship, Placements, Direction, ShipId} from "./svShips.js";

let GameState = {
    Buildphase: 0,
    Connecting: 1,
    Attacking: 2,
    Attacked: 3,
    EnemyAttack: 4,
    GameWon: 5,
    GameLost: 6
};

let playerConfig = {name: "", asHost: false};

function setup(){
    Placements.clear();
    uiClear();
    uiEnableDrawingMode(true);
    lUpdateShipNumbers(ShipId.Default);
    softSetup();
}

function softSetup(){
    uiConnectionLost();
    uiEnableShooting(false);
    // TODO uiRepaint()???
}

function testPlacement(){
    addShip(new Ship(new Vector(0, 0), Direction.East, ShipId.Battleship));

    for(let i = 0; i < 5; i++){
        addShip(new Ship(new Vector(0, i), Direction.East, ShipId.Cruiser));
    }

    for(let i = 0; i < 10; i++){
        addShip(new Ship(new Vector(0, i), Direction.East, ShipId.Destroyer));
    }
    addShip(new Ship(new Vector(5, 6), Direction.South, ShipId.Destroyer));

    for(let i = 0; i < 10; i++){
        addShip(new Ship(new Vector(7, i), Direction.East, ShipId.Submarine));
    }
}

/**
 * Updates the UI's ship numbers to the current state
 * or, if wanted, with a specified ship reduced by 1
 * @param shipId {number} the ship number to reduce, or null if all should be legit
 */
window.lUpdateShipNumbers = function (shipId){
    let bsNumber = Placements.getSpareShipCount(ShipId.Battleship);
    let crNumber = Placements.getSpareShipCount(ShipId.Cruiser);
    let deNumber = Placements.getSpareShipCount(ShipId.Destroyer);
    let sbNumber = Placements.getSpareShipCount(ShipId.Submarine);

    uiUpdateShipNumbers(bsNumber - (shipId === ShipId.Battleship)
                        , crNumber - (shipId === ShipId.Cruiser)
                        , deNumber - (shipId === ShipId.Destroyer)
                        , sbNumber - (shipId === ShipId.Submarine)
    );
}

/**
 * @param coordinate {Vector}
 */
window.lSendFire = function (coordinate){
    sSendFire({x: coordinate.x, y: coordinate.y});
    uiOnShot(coordinate, true);
    changeGameState(GameState.Attacked);
}

/**
 * @param coordinate {Vector}
 * @param result {"hit" || "miss" || "destroyed" || "I_Am_A_Looser"}
 */
window.lSendAnswer = function (coordinate, result){
    sSendAnswer({x: coordinate.x, y: coordinate.y}, result);
    switch (result){
        case "hit":
        case "destroyed":
            changeGameState(GameState.EnemyAttack);
            break;
        case "miss":
            changeGameState(GameState.Attacking);
            break;
        case "I_Am_A_Looser":
            changeGameState(GameState.GameLost);
            break;
    }
}

/**
 * @param coordinates {{x: number, y: number}}
 */
window.lGetFire = function (coordinates) {
    let coordinate = new Vector(coordinates.x, coordinates.y);
    let shotState = Placements.hitsShip(coordinate);
    uiOnShot(coordinate, false);

    switch (shotState) {
        case 0:
            lSendAnswer(coordinate, "miss")
            break;
        case 1:
            Placements.hitShip(coordinate);
            updateShip(coordinate);
            lSendAnswer(coordinate, "hit");
            break;
        case 2:
            Placements.hitShip(coordinate);
            updateShip(coordinate);
            lSendAnswer(coordinate, Placements.isGameOver() ? "I_Am_A_Looser" : "destroyed");
            break;
    }
}

/**
 * @param coordinates {{x: number, y: number}}
 * @param result {"hit" || "miss" || "destroyed" || "I_Am_A_Looser"}
 */
window.lGetAnswer = function (coordinates, result){
    let coordinate = new Vector(coordinates.x, coordinates.y);

    switch (result){
        case "hit":
            uiOnHit(coordinate);
            changeGameState(GameState.Attacking);
            break;
        case "miss":
            changeGameState(GameState.EnemyAttack);
            break;
        case "destroyed":
            uiOnDestroyed(coordinate);
            changeGameState(GameState.Attacking);
            break;
        case "I_Am_A_Looser":
            changeGameState(GameState.GameWon);
    }
}

/**
 * @param coordinate  {Vector}
 */
function updateShip(coordinate){
    let ship = Placements.getShipFromVector(coordinate);
    uiUpdateShip(ship.getTileVectors(), ship.colours);
}

/**
 * @param coordinates {[Vector]}
 * @return {boolean}
 */
window.lAddShip = function(coordinates){
    let {ship, placeState} = Placements.placeShipByVectors(coordinates);

    if(placeState){
        addShipToUI(ship);
        return true;
    }

    return false;
}

/**
 * @param ship {Ship}
 */
function addShipToUI(ship){
    if(Placements.getShipCount() === Placements.getMaxShipCount())
        uiEnableDrawingMode(false);
    uiAddShip(ship.getTileVectors(), ship.colours);
}

/**
 * @param client {{name: String, clientId: number}}
 */
window.lOnConnectRequest = function (client){
    // TODO ask for permission
}

/**
 * @param config {{name: String, asHost: boolean}}
 */
window.lConnect = function (config){
    playerConfig = config;
    changeGameState(GameState.Connecting);
}

window.lDisconnect = function (){
    sDisconnect();
    alert("Back to building phase due to disconnect");
    changeGameState(GameState.Buildphase);
}

window.lOnConnection = function (){
    changeGameState(playerConfig.asHost? GameState.Attacking : GameState.EnemyAttack);
    uiConnectionBuild();
}

function changeGameState(gameState){
    switch (gameState){
        case GameState.Buildphase:
            uiUpdateGameState("building ships");
            softSetup();
            break;
        case GameState.Connecting:
            uiUpdateGameState("connecting to " + playerConfig.asHost? "host" : "client");
            break;
        case GameState.Attacking:
            uiUpdateGameState("attacking");
            uiEnableShooting(true);
            break;
        case GameState.Attacked:
            sListenOn(Call.Answer);
            uiEnableShooting(false);
            break;
        case GameState.EnemyAttack:
            uiUpdateGameState("enemy attacks");
            sListenOn(Call.Fire);
            break;
        case GameState.GameWon:
            uiUpdateGameState("YOU WIN!!!");
            uiEnableShooting(false);
            break;
        case GameState.GameLost:
            uiUpdateGameState("you loose lmao");
            uiEnableShooting(false);
            break;
    }

    window.lRestart = function (){
        setup();
    }
}