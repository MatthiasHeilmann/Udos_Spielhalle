import {FieldDrawer} from "/js/svCanvasDrawer.js";

const connectButton = document.getElementById("connect");
const gameCanvas = document.querySelector("#game canvas");
const field = new FieldDrawer(gameCanvas);

function initializeUI(){
}

let beforeX;
let beforeY;
$("#game canvas").mousemove((e) => {
    if(Math.abs(beforeX - e.pageX) < field.tileWidth
    && Math.abs(beforeY - e.pageY) < field.tileHeight)
        return;
    console.log("Movement: " + Math.abs(beforeX - e.pageX) + "x" + Math.abs(beforeY - e.pageY));
    if(beforeX && beforeY)
        field.drawTileOnMouse(beforeX, beforeY, "white");
    field.drawTileOnMouse(e.pageX, e.pageY,"blue");

    beforeX = e.pageX;
    beforeY = e.pageY;
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

initializeUI();