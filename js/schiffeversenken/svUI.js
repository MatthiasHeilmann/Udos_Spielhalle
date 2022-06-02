import {CanvasDrawer} from "./svCanvasDrawer.js";
import {Direction, Placements, Vector} from "/js/schiffeversenken/svShips.js"

class Grid {
    highlightColour = "lightgrey";
    undrawColour = "white";

    /**
     * @type {[Vector]}
     */
    shotTiles = [];
    lastCursorPosition = Vector.defaultVector;

    /**
     * Paint queue
     * @type {[{coordinate: Vector, colour: string, callback: function, remove: boolean}]}
     */
    paintQueue = [];

    /**
     * @type CanvasDrawer
     */
    drawer;

    /**
     * @param canvas{HTMLElement}
     */
    constructor(canvas) {
        this.drawer = new CanvasDrawer(canvas);

        $(canvas).on("mouseenter", () => {
            $(canvas).on("mousemove", (e) => {
                let currentPosition = this.getVectorFromCoordinate(e.pageX, e.pageY);

                // Check if the mouse moved to the next tile
                if (this.lastCursorPosition &&
                    !this.lastCursorPosition.distanceFrom(currentPosition))
                    return;

                this.highlightTile(currentPosition, this.highlightColour);

                this.lastCursorPosition = currentPosition;
                this.update();
            });
        }).on("mouseleave", () => {
            this.update();
            this.lastCursorPosition = Vector.defaultVector;
        });

        this.repaint();
    }

    update() {
        this.repaint();

        this.paintQueue.forEach((element) => {
            if (element.callback)
                element.callback(element.coordinate, element.colour);
            if (element.remove) {
                this.paintQueue.splice(this.paintQueue.indexOf(element), 1);
            }
        });
    }

    /**
     * @param pos {Vector}
     * @param colour
     */
    highlightTile(pos, colour) {
        this.paintQueue.push({
            coordinate: pos, colour
            , callback: this.drawer.drawTile.bind(this.drawer), remove: true
        });
    }

    getVectorFromCoordinate(x, y) {
        return this.drawer.getVectorCoordinate(x, y);
    }

    /**
     * @param v {Vector}
     */
    addShotCoordinate(v) {
        this.shotTiles.push(v);
        this.update();
    }

    /**
     * @param tile {Vector}
     * @return the index of the element or -1
     */
    paintQueueContains(tile){
        for(let i = 0; i < this.paintQueue.length; i++){
            if(!this.paintQueue[i].coordinate.distanceFrom(tile))
                return i;
        }
        return -1;
    }

    repaint() {
        this.drawer.clear();
    }

    updateCanvas(){
        this.drawer.update();
    }

    clear(){
        this.paintQueue = [];
        this.shotTiles = [];
        this.lastCursorPosition = Vector.defaultVector;
        this.repaint();
    }
}

class PlayerGrid extends Grid {
    drawColour = "blue";
    deniedColour = "#c77dff";

    /**
     * @type {[Vector]}
     */
    drawnTiles = [];
    surroundingTiles = this.drawnTiles;
    isDrawing = false;
    stepBackPosition = Vector.defaultVector;
    lastDrawPosition = Vector.defaultVector;

    placementMode = true;
    undrawDrawnCoordinates = false;

    /**
     * @param canvas {HTMLElement}
     */
    constructor(canvas) {
        super(canvas);

        $(canvas).on("mouseenter", () => {
            if(!this.placementMode) return;
            $(canvas).on("mousemove", (e) => {
                let currentPosition = this.getVectorFromCoordinate(e.pageX, e.pageY);

                if (!this.isDrawing
                    || (this.lastDrawPosition &&
                        !this.lastDrawPosition.distanceFrom(currentPosition))) {
                    return;
                }

                if (!this.drawnTilesInclude(currentPosition)) {
                    this.undrawDrawnCoordinates = false;
                    this.drawnTiles.push(currentPosition);
                    this.lastDrawPosition = currentPosition;

                    initializeNumberUpdate(this.drawnTiles);
                } else {
                    this.stepBackPosition = this.drawnTiles.pop();
                }

                this.lastCursorPosition = currentPosition;
                this.update();
            }).on("mousedown", () => {
                this.isDrawing = true;
            }).on("mouseup", () => {
                this.isDrawing = false;
                initializeAddShip(this.drawnTiles)
                initializeNumberUpdate(null)
                this.undrawDrawnCoordinates = true;
            })
        });
    }

    update() {
        super.update();

        if (this.placementMode) {
            this.surroundingTiles.forEach((v) => {
                this.drawer.drawTile(v, this.deniedColour);
            })
            this.drawnTiles.forEach((v) => {
                this.drawer.drawTile(v, this.undrawDrawnCoordinates ? this.undrawColour : this.drawColour);
            });
            if (this.undrawDrawnCoordinates)
                this.drawnTiles = [];

            if (this.stepBackPosition.exists()) {
                this.drawer.drawTile(this.stepBackPosition, this.undrawColour);
                this.stepBackPosition = Vector.defaultVector;
            }

        }

        this.shotTiles.forEach(tile => {
            this.drawer.drawShotMark(tile);
        })
    }

    /**
     * @param tiles {[Vector]}
     * @param colours {[String]}
     */
    addShip(tiles, colours){
        for(let i = 0; i < tiles.length; i++){
            this.paintQueue.push({coordinate: tiles[i], colour: colours[i]
                , callback: this.drawer.drawTile.bind(this.drawer), remove: false})
        }
        this.addSurroundingTiles(tiles);
        this.update();
    }

    /**
     * @param tiles {[Vector]}
     * @param colours {[String]}
     */
    updateShip(tiles, colours){
        for(let i = 0; i < tiles.length; i++){
            let index = this.paintQueueContains(tiles[i]);
            if(index !== -1){
                this.paintQueue[index].colour = colours[i];
            }
        }
        this.update();
    }

    /**
     * @param tiles {[Vector]} the Tiles to surround
     */
    addSurroundingTiles(tiles){
        let horizontal;
        let offset = 0;

        switch (Placements.generateDirectionByVectors(tiles)){
            case Direction.West:
                offset = 2;
            case Direction.East:
                offset -= 1;
                horizontal = true;
                break;
            case Direction.North:
                offset = 2;
            case Direction.South:
                offset -= 1;
                horizontal = false;
                break;
        }

        let extendedShip = this.generateExtendedShip(tiles, horizontal, offset);
        let surroundingTiles = this.getSurroundingTiles(extendedShip, horizontal);
        this.surroundingTiles.push(surroundingTiles);
    }

    /**
     * Gets all tiles surrounding the given ones.
     * Supposed to get tiles that have one extra at the front and end
     * @param tiles {[Vector]}
     * @param horizontal {boolean}
     * @return {[Vector]}
     */
    getSurroundingTiles(tiles, horizontal){
        let surroundingTiles = [];
        for(let i = 0; i < tiles.length; i++){
            let currentTile = tiles[i];
            if(i === 0){
                surroundingTiles.push(tiles[0]);
            }
            else if(i === tiles.length-1){
                surroundingTiles.push(tiles[tiles.length -1])
            }
            // Add tile above/right to the current one
            surroundingTiles.push(new Vector(currentTile.x + (!horizontal), currentTile.y + horizontal))
            // Add tile under/left to the current one
            surroundingTiles.push(new Vector(currentTile.x - (!horizontal), currentTile.y - horizontal))
        }
        return surroundingTiles;
    }

    /**
     * Generates an extended version of the given ship by adding one tile
     * to the front and the end
     * @param tiles {[Vector]}
     * @param horizontal {boolean}
     * @param offset {number}
     * @return {[Vector]}
     */
    generateExtendedShip(tiles, horizontal, offset){
        let newLength = tiles.length+2;
        let extendedTiles = [];
        let start = tiles[0];
        let end = tiles[tiles.length-1];
        for(let i = 0; i < newLength; i++){
            if(i === 0){
                extendedTiles.push(new Vector(start.x + (offset*horizontal)
                                        , start.y + (offset*(!horizontal))));
            }
            else if(i === newLength-1){
                extendedTiles.push(new Vector(end.x - (offset*horizontal)
                                        , end.y - (offset*(!horizontal))));
            }
            else{
                extendedTiles.push(tiles.shift());
            }
        }

        return extendedTiles;

    }

    drawnTilesInclude(v) {
        for (let tile of this.drawnTiles) {
            if (!tile.distanceFrom(v)) return true;
        }
        return false;
    }

    enableDrawingMode(mode){
        this.placementMode = mode;
    }

    clear(){
        super.clear();
        this.surroundingTiles = [];
        this.drawnTiles = [];
        this.lastDrawPosition = Vector.defaultVector;
        this.placementMode = false;
        this.undrawDrawnCoordinates = false;
    }
}

class EnemyGrid extends Grid {
    shotColour = "orange";
    destroyedColour = "red";

    playerIsShooting = false;

    hitTiles = [];
    destroyedTiles = [];

    /**
     * @param canvas {HTMLElement}
     */
    constructor(canvas) {
        super(canvas);

        $(canvas).on("click", (e) => {
           if(this.playerIsShooting){
               initializeShotTaken(this.getVectorFromCoordinate(e.pageX, e.pageY));
           }
        });
    }

    update(){
        super.update();

        this.hitTiles.forEach(tile => {
            this.drawer.drawTile(tile, this.shotColour);
        })

        this.destroyedTiles.forEach(tile => {
            this.drawer.drawTile(tile, this.destroyedColour);
        })

        this.shotTiles.forEach(tile => {
            this.drawer.drawShotMark(tile);
        })
    }

    addHitTile(v){
        this.hitTiles.push(v);
    }

    addDestroyedTile(v){
        this.destroyedTiles.push(v);
    }

    setPlayerShooting(mode){
        this.playerIsShooting = mode;
    }

    clear(){
        super.clear();
        this.playerIsShooting = false;
    }
}


const connectButton = document.getElementById("connect");
const togglePlayerButton = document.querySelector("#game button");
const playerCanvas = document.querySelector("#game canvas.player");
const enemyCanvas = document.querySelector("#game canvas.enemy");
const playerDrawer = new PlayerGrid(playerCanvas);
const enemyDrawer = new EnemyGrid(enemyCanvas);

$(connectButton).on('click', (e) => {
    const nameField = $('#name input');
    const asHostField = $('#asHost input');

    if (!nameField[0].value) {
        alert("No Name set")
        nameField.parent().addClass('error').end().addClass('error');
    } else {
        // Connect function called in svSocket.js
        initializeConnection({name: nameField[0].value, asHost: asHostField[0].checked});
        nameField.parent().removeClass('error')
            .end().removeClass('error').attr("disabled");
        asHostField.attr('disabled', '');
        $(connectButton).attr('disabled', '');
    }
});

$(togglePlayerButton).on('click', (e) => {
    toggleCanvas();
})

$('#reload_lobby').on('click', () => {
    lOnReloadOpenGames();
})

/**
 * @param v {Vector}
 */
function initializeShotTaken(v){
    lSendFire(v);
}

/**
 * @param tiles {[Vector]}
 */
function initializeAddShip(tiles){
    lAddShip(tiles);
}

/**
 * @param tiles {[Vector]}
 */
function initializeNumberUpdate(tiles){
    let shipId = Placements.getShipIdByVectors(tiles);
    lUpdateShipNumbers(shipId);
}

function initializeConnection(config){
    lConnect(config);
}

function initializeDisconnect(){
    lDisconnect();
}

window.uiInitialize = function () {
    $('.enemy').css('display', 'none');
}

window.uiEnableDrawingMode = function (mode){
    playerDrawer.enableDrawingMode(mode);
    if(mode) {
        $('#number_container').css("visibility", "visible");
        connectButton.setAttribute("disabled", "");
    }
    else {
        $('#number_container').css("visibility", "hidden");
        connectButton.removeAttribute("disabled");
    }
}

window.uiEnableShooting = function (mode){
    enemyDrawer.setPlayerShooting(mode);
}

window.uiUpdateGameState = function (gameState){
    $('#gamestate').text(gameState);
}

/**
 * @param changedShip {number}
 * @param numbers {number}
 */
window.uiUpdateShipNumbers = function (changedShip, ...numbers){
    $('#bs_number p')[1].innerText = numbers[0];
    $('#cr_number p')[1].innerText = numbers[1];
    $('#de_number p')[1].innerText = numbers[2];
    $('#sb_number p')[1].innerText = numbers[3];

    $('#number_container div').each((index, div) => {
        $(div).css("color", ((index+1) === changedShip?
            (numbers[index] >= 0? "green" : "red")
            : "black"));
    });
}

window.uiUpdateShip = function (coordinates, newColours){
    playerDrawer.updateShip(coordinates, newColours);
}

window.uiAddShip = function (coordinates, colours){
    playerDrawer.addShip(coordinates, colours);
    initializeNumberUpdate(null);
}

/**
 * @param tile {Vector}
 * @param fromPlayer {boolean}
 */
window.uiOnShot = function (tile, fromPlayer){
    (fromPlayer? enemyDrawer:playerDrawer).addShotCoordinate(tile);
}

/**
 * @param tile {Vector}
 */
window.uiOnHit = function (tile){
    enemyDrawer.addHitTile(tile);
}

/**
 * @param tile {Vector}
 */
window.uiOnDestroyed = function (tile){
    enemyDrawer.addDestroyedTile(tile);
}

/**
 * @param asHost {boolean}
 * @param insertList {[{name: string, id: number}]} id as clientId or hostId
 */
window.uiUpdateLobbyList = function(asHost, insertList){
    const table = $('#lobbyList');
    if(asHost){
        insertClient(insertList[0], table);
    }
    else{
        resetLobbyTable(asHost);
        insertHosts(insertList, table);
    }
    $('#game').css("display", "none");
    $('#lobby').css("display", "");
}

/**
 * @param asHost {boolean}
 */
window.uiShowLobbyList = function (asHost){
    resetLobbyTable(asHost);

    $('#game').css('display', 'none');
    $('#lobby').css('display', '');
    $('#reload_lobby').css('display', asHost? 'none' : '');
}

function resetLobbyTable(asHost){
    $('#lobbyList').html(`<tr>` +
        `<th>${asHost? 'Host Name' : 'Client Name'}</th>` +
        `<th> </th>` +
        `</tr>`
    );
}

/**
 * @param client {{name: string, clientId: number}}
 * @param table {JQuery<HTMLElement>}
 */
function insertClient(client, table){
    const row = $(document.createElement("tr"));
    const nameData = $(document.createElement("td"));
    const buttonData = $(document.createElement("td"));
    const clientName = $(document.createElement("p"));
    const allowButton = $(document.createElement("button"));
    const declineButton = $(document.createElement("button"));

    clientName.text(client.name);
    allowButton.text('Accept');
    allowButton.on('click', () => {
        lOnAnswerGameRequest(client.clientId, true);
    });
    declineButton.text('Decline');
    declineButton.on('click', () => {
        lOnAnswerGameRequest(client.clientId, false);
    });

    nameData.append(clientName);
    buttonData.append(allowButton);
    buttonData.append(declineButton);
    row.append(nameData, buttonData);
    table.append(row);
}

/**
 * @param hostList {[{name: string, hostId: number}]}
 * @param table {JQuery<HTMLElement>}
 */
function insertHosts(hostList, table){
    for(let host of hostList){
        const row = $(document.createElement("tr"));
        const nameData = $(document.createElement("td"));
        const buttonData = $(document.createElement("td"));
        const hostName = $(document.createElement("p"));
        const joinButton = $(document.createElement("button"));

        hostName.text(host.name);
        joinButton.text('Join');
        joinButton.on('click', () => {
            lOnSendGameRequest(host.hostId);
        });

        nameData.append(hostName);
        buttonData.append(joinButton);
        row.append(nameData, buttonData);
        table.append(row);
    }
}

window.uiConnectionBuild = function (){
    $('#game').css("display", "");
    $('#lobby').css("display", "none");

    connectButton.removeAttribute("disabled");
    connectButton.textContent = "Disconnect";
    togglePlayerButton.removeAttribute("disabled");
}

window.uiConnectionLost = function (){
    connectButton.textContent = "Connect";

    setPlayerVisible(true);
    // TODO enable clear field button
}

function toggleCanvas(){
    let playerVisible = ($(playerCanvas).css("display") !== "none");
    setPlayerVisible(!playerVisible);
}

function setPlayerVisible(mode){
    $('.player').css("display", mode? "" : "none");
    $('.enemy').css("display", (!mode)? "" : "none");
    (mode? playerDrawer: enemyDrawer).updateCanvas();
}

window.uiClear = function () {
    playerDrawer.clear();
    enemyDrawer.clear();
    uiInitialize();
}