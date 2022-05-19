import {Vector} from "./svShips.js";

export const defaultSize = 10;

export class CanvasDrawer{
    /**
     * size of the coordinate system in x and y direction
     * @type {number}
     */
    size = defaultSize;
    
    constructor(canvas){
        this.canvasBoundings = canvas.getBoundingClientRect();
        /**
         * @type CanvasRenderingContext2D
         */
        this.context = canvas.getContext("2d");
        this.x = this.canvasBoundings.x;
        this.y = this.canvasBoundings.y;
        this.width = canvas.width;
        this.height = canvas.height;
        this.tileWidth = Math.floor(this.width / this.size);
        this.tileHeight = Math.floor(this.height / this.size);

        this.#drawLines();
    }

    /**
     * Draws the Tile which contains the given x-/y-coordinates
     * @param coordinate {Vector} x-/y-coordinates relative to the drawn system (getVectorCoordinate)
     * @param colour {String} colour to paint the tile in
     */
    drawTile(coordinate, colour){
        this.#drawRect(coordinate.x*this.tileWidth, coordinate.y*this.tileHeight
                        , this.tileWidth, this.tileHeight, colour);
    }

    /**
     * Draws a X onto the given coordinate
     * @param coordinate {Vector}
     */
    drawShotMark(coordinate){
        // Top left corner of the Tile
        const tileX = coordinate.x*this.tileWidth;
        const tileY = coordinate.y*this.tileHeight;

        this.context.lineWidth = 0.5;
        this.context.lineCap = "square";
        this.context.strokeStyle = "black";
        this.context.beginPath();

        // Draw vertical lines
        this.context.moveTo( tileX + 0.5, tileY);
        this.context.lineTo(tileX + this.tileWidth + 0.5, tileY + this.tileHeight);

        // Draw horizontal lines
        this.context.moveTo(tileX + this.tileWidth,  tileY + 0.5);
        this.context.lineTo(this.width, tileY + this.tileHeight + 0.5);

        this.context.stroke();
    }

    #drawRect(x, y, width, height, colour){
        // Paint a new rectangle without overdrawing the lines
        this.context.beginPath();
        this.context.rect(x+1.5, y+1.5, width-1.5, height-1.5);
        this.context.fillStyle = colour;
        this.context.fill();
    }

    #drawLines(){
        this.context.lineWidth = 0.5;
        this.context.lineCap = "square";
        this.context.strokeStyle = "black";
        for(let i = 0; i <= this.size; i++){
            this.context.beginPath();

            // Draw vertical lines
            this.context.moveTo(i*this.tileWidth + 0.5, 0);
            this.context.lineTo(i*this.tileWidth + 0.5, this.height);

            // Draw horizontal lines
            this.context.moveTo(0, i*this.tileHeight + 0.5);
            this.context.lineTo(this.width, i*this.tileHeight + 0.5);

            this.context.stroke();
        }
    }

    /**
     * @param x x-Position relative to the body element
     * @param y y-Position relative to the body element
     * @return {{x: number, y: number}} x-/y-Position relative to the canvas element
     */
    #getCorrespondingCoordinates(x, y){
        const offsetX = this.canvasBoundings.width/this.width;
        const offsetY = this.canvasBoundings.height/this.height;
        return {x: Math.round((x - this.x) /offsetX),
                y: Math.round(y - this.y) / offsetY};
    }

    /**
     * @param x x-Position relative to the canvas element
     * @param y y-Position relative to the canvas element
     * @return {Vector} x-/y-Position relative to the painted coordinate system (0 - 9)
     */
    #getVectorCoordinate(x, y){
        let cordX = Math.floor(x / this.tileWidth);
        let cordY = Math.floor(y / this.tileHeight);

        return new Vector(cordX, cordY);
    }

    /**
     * Takes the current position of the mouse and returns the vector of the field direct below it
     * @param x x-Position relative to the body element
     * @param y y-Position relative to the body element
     * @return {Vector}
     */
    getVectorCoordinate(x, y){
        let pos = this.#getCorrespondingCoordinates(x, y);
        return this.#getVectorCoordinate(pos.x, pos.y);
    }

    clear(){
        this.context.rect(0, 0, this.width, this.height);
        this.context.fillStyle = "white";
        this.context.fill();
        this.#drawLines()
    }
}