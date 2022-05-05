export const defaultSize = 10;

export class FieldDrawer{
    /**
     * size of the coordinate system in x and y direction
     * @type {number}
     */
    size = defaultSize;

    constructor() {
        // Default constructor used for only the constant values
    }

    constructor(canvas){
        this.canvasBoundings = canvas.getBoundingClientRect();
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
     * Draws the Tile lying directly under the current mouse position
     * @param x x-Position of the mouse relative to the body element
     * @param y y-Position of the mouse relative to the body element
     * @param colour colour to paint the tile in
     */
    drawTileOnMouse(x, y, colour){
        // Coordinates corresponding to the coordinate system of the canvas
        let pos = this.#getCorrespondingCoordinates(x, y);

        this.drawTile(pos.x, pos.y, colour);
    }

    /**
     * Draws the Tile which contains the given x-/y-coordinates
     * @param x x-Position relative to the canvas element
     * @param y y-Position relative to the canvas element
     * @param colour colour to paint the tile in
     */
    drawTile(x, y, colour){
        // Get the coordinates of the hovered tile
        const tile  = this.#getVectorCoordinates(x, y);
        console.log("Tile on: " + tile.x + ";" + tile.y)
        this.drawRect(tile.x*this.tileWidth, tile.y*this.tileHeight, colour);
    }

    drawRect(x, y, colour){
        this.#drawRect(x, y, this.tileWidth, this.tileHeight, colour);
    }

    #drawRect(x, y, width, height, colour){
        // Paint a new rectangle without overdrawing the lines
        this.context.beginPath();
        this.context.rect(x+1.5, y+1.5, width-1.5, height-1.5);
        this.context.fillStyle = colour;
        this.context.fill();
    }

    #drawLines(){
        console.log("Drawing: " + this.width + "x" + this.height + ", " + this.tileWidth + ";" + this.tileHeight);

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
     * @return {{x: number, y: number}} x-/y-Position relative to the painted coordinate system (0 - 9)
     */
    #getVectorCoordinates(x, y){
        console.log("Tile for: " + x + ";" + y);
        console.log("Tile: " + Math.floor(x / this.tileWidth) + ";" + Math.floor(y / this.tileHeight))
        return {x: Math.floor(x / this.tileWidth),
                y: Math.floor(y / this.tileHeight)};
    }
}