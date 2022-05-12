import {FieldDrawer} from "/js/svCanvasDrawer.js";
import {Vector} from "/js/svShips.js"

const connectButton = document.getElementById("connect");
const gameCanvas = document.querySelector("#game canvas");
const drawer = new FieldDrawer(gameCanvas);

const highlightColour = "lightgrey";
const drawColour = "blue";
const undrawColour = "white";

function initializeUI(){
}

/**
 * Draw ships in order
 * @type {[{coordinate: Vector, colour: string}]}
 */
let ships = [];

// Trace enemy shots
/**
 * @type {[Vector]}
 */
let shotCoordinates = []

// Trace drag (drawing ships)
/**
 * @type {[Vector]}
 */
let drawnTiles = [];
let drawing = false;
let stepBackPosition = Vector.defaultVector;
let lastDrawPosition = Vector.defaultVector;

// Trace hover (highlighting courser)
let lastCursorPosition = Vector.defaultVector;

// Checkmarks
let placementMode = true;
let undrawDrawnCoordinates = false;
let undrawSurroundingCoordinates = false;

/**
 * Paint queue
 * @type {[{coordinate: Vector, colour: string, callback: function, remove: boolean}]}
 */
let paintQueue = [];

$("#game canvas").mouseenter(() => {
    $("#game canvas").mousemove((e) => {
        let currentPosition = getVectorFromCoordinate(e.pageX, e.pageY);

        // Highlight the mouseover or draw a ship
        if(!drawing) {
            // Check if the mouse moved to the next tile
            if (lastCursorPosition &&
                !lastCursorPosition.distanceFrom(currentPosition))
                return;

            highlightTile(lastCursorPosition, undrawColour);
            highlightTile(currentPosition, highlightColour);
        }
        else if(drawing && placementMode){
            if (lastDrawPosition &&
                !lastDrawPosition.distanceFrom(currentPosition))
                return;
            console.log("Drawing againn???");
            if(!drawnTilesInclude(currentPosition)){
                undrawDrawnCoordinates = false;
                drawnTiles.push(currentPosition);
                lastDrawPosition = currentPosition;

                /*
                    TODO initializeNumberUpdate(drawnTiles)
                 */
            }
            else{
                stepBackPosition = drawnTiles.pop();
            }
        }
        lastCursorPosition = currentPosition;
        update();

    }).mousedown(() => {
        drawing = true;
    }).mouseup(() => {
        drawing = false;
        /*
            TODO initializeAddShip(drawnTiles)
         */
        undrawDrawnCoordinates = true;
    })
}).mouseleave(() => {
    highlightTile(lastCursorPosition, undrawColour);
    update();
    lastCursorPosition = Vector.defaultVector;
    lastDrawPosition = Vector.defaultVector;
});

$('#connect').click((e) => {
    const nameField = $('#name input');
    const asHostField = $('#asHost input');

    if(!nameField[0].value){
        alert("No Name set")
        nameField.parent().addClass("error").end().addClass("error");
    }
    else{
        // Connect function called in svSocket.js
        connect({name: nameField[0].value, asHost: asHostField[0].checked});
        nameField.parent().removeClass("error").end().removeClass("error");
        asHostField.attr("disabled", "");
        $(connectButton).attr("disabled", "");
    }
});

function update(){
    repaint();
    if(placementMode){
        drawnTiles.forEach((v) => {
            drawer.drawTile(v, undrawDrawnCoordinates? undrawColour: drawColour);
        });
        if(undrawDrawnCoordinates) drawnTiles = [];
        if(stepBackPosition.exists()){
            drawer.drawTile(stepBackPosition, undrawColour);
            stepBackPosition = Vector.defaultVector;
        }
    }
    paintQueue.forEach((element) => {
        if(element.callback)
            element.callback(element.coordinate, element.colour);
        if(element.remove){
            paintQueue.splice(paintQueue.indexOf(element), 1);
        }
    });
}

function drawnTilesInclude(v){
    for(let tile of drawnTiles){
        if(!tile.distanceFrom(v)) return true;
    }
    return false;
}

/**
 *
 * @param pos {Vector}
 * @param colour
 */
function highlightTile(pos, colour){
    paintQueue.push({coordinate: pos, colour
        , callback:drawer.drawTile.bind(drawer), remove: true});
}

function getVectorFromCoordinate(x, y){
    let pos = drawer.getVectorCoordinate(x, y);
    return new Vector(pos.x, pos.y)
}

function repaint(){
    drawer.clear();
}

function clearUI(){

}

initializeUI();