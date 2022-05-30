import {defaultSize} from "./svCanvasDrawer.js";

export const Direction = {
    Default: 0,
    North: 1,
    East: 2,
    South: 3,
    West: 4,
    getDirectionName(index){
        switch (index){
            case 0: return "Default";
            case 1: return "North";
            case 2: return "East";
            case 3: return "South";
            case 4: return "West";
        }
    }
};

export const ShipId = {
    Default: 0,
    Battleship: 1,
    Cruiser: 2,
    Destroyer: 3,
    Submarine: 4
};

/**
 * This class represents the x- and y-Position, relative to the painted system.
 * It represents one square in the painted coordinate system
 */
export class Vector {
    #x;
    #y;

    static defaultVector = new Vector(-1, -1);

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    add(v) {
        return new Vector(this.#x + v.#x, this.#y + v.#y);
    }

    /**
     * Calculates the x and y distance of this vector to the given one
     * @param v {Vector}
     * @return {number} addition of x and y distances dx+dy
     */
    distanceFrom(v) {
        let distance = 0;

        distance += Math.abs(this.#x - v.#x);
        distance += Math.abs(this.#y - v.#y);

        return distance;
    }

    /**
     * Calculates the direction the specified vector is placed from perspective of this vector
     * @param v
     * @return {Vector} v - this
     */
    directionFrom(v) {
        let xDiff = v.#x - this.#x;
        let yDiff = v.#y - this.#y;

        return new Vector(xDiff, yDiff);
    }

    /**
     * Tells whether this coordinate exists on a only positive coordinate system
     * @return {boolean}
     */
    exists(){
        return !(this.#x <= -1 || this.#y <= -1);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

/**
 * This class contains all information about one part of a ship.
 * Later being represented as a square inside the painted coordinate system
 */
class Tile {
    static  defaultTile = new Tile(null);

    #defaultColour = "#ffffff";
    #destroyedColour = "red";
    #shotColour = "#ff0000";
    #shipColours = ["#7400b8", "#5e60ce", "#74c69d", "#40916c"];

    #ownerId;
    #ownerDestroyed;
    #isShot = false;

    constructor(ownerShip) {
        this.#ownerId = ownerShip;
    }

    getColour() {
        if(this.#ownerDestroyed) return this.#destroyedColour
        if (this.#isShot) return this.#shotColour;

        return this.#shipColours[this.#ownerId-1] || this.#defaultColour;
    }

    destroy(){
        this.#ownerDestroyed = true;
    }

    shoot() {
        this.#isShot = true;
    }

    get isShot() {
        return this.#isShot;
    }
}

export class Ship {
    #name = "Default";
    #shipId = ShipId.Default;
    #startingPosition = new Vector(0, 0);
    #direction = Direction.Default;
    #length = 0;
    #tiles = [Tile.defaultTile];
    #shipNames = ["Battleship", "Cruiser", "Destroyer", "Submarine"];

    constructor(startingPosition, direction, shipId) {
        this.#startingPosition = startingPosition;
        this.#direction = direction;
        this.#shipId = shipId;
        this.#length = Math.abs(shipId-5)+1;
        this.#name = this.#shipNames[shipId-1];
        this.buildTiles();
    }

    getTileVectors() {
        let tileVectors = [];
        for (let i = 0; i < this.#length; i++) {
            switch (this.#direction) {
                case Direction.North:
                    tileVectors.push(new Vector(this.#startingPosition.x, this.#startingPosition.y - i));
                    break;
                case Direction.East:
                    tileVectors.push(new Vector(this.#startingPosition.x + i, this.#startingPosition.y));
                    break;
                case Direction.South:
                    tileVectors.push(new Vector(this.#startingPosition.x, this.#startingPosition.y + i));
                    break;
                case Direction.West:
                    tileVectors.push(new Vector(this.#startingPosition - i, this.#startingPosition.y));
                    break;
            }
        }
        return tileVectors;
    }

    /**
     *
     * @param v {Vector}
     */
    getTileByVector(v) {
        let tile;
        try {
            switch (this.#direction) {
                case Direction.North:
                case Direction.South:
                    if (this.#startingPosition.x - v.x === 0) {
                        tile = this.#tiles[Math.abs(this.#startingPosition.y - v.y)];
                    }
                    break;
                case Direction.East:
                case Direction.West:
                    if (this.#startingPosition.y - v.y === 0) {
                        tile = this.#tiles[Math.abs(this.#startingPosition.x - v.x)];
                    }
                    break;
            }
        } catch (error) {
            //Tile is not part of this ship
        }
        return tile || null;
    }

    buildTiles() {
        this.#tiles = [];
        for (let i = 0; i < this.#length; i++) {
            this.#tiles.push(new Tile(this.#shipId));
        }
    }

    /**
     * Set the, by the coordinate specified Tile, as hit
     * @param coordinate {Vector}
     */
    hitTile(coordinate){
        let hitTile = this.getTileByVector(coordinate);

        if(hitTile === null)
            console.error("No Tile was hit but tried to set anyways: "
                + coordinate.x + ", " + coordinate.y)

        hitTile.shoot()

        if(this.isDestroyed){
            for(let tile of this.#tiles){
                tile.destroy();
            }
        }
    }

    get colours(){
        let colours = [];
        for(let tile of this.#tiles){
            colours.push(tile.getColour());
        }
        return colours;
    }

    get isDestroyed(){
        for(let tile of this.#tiles){
            if(!tile.isShot) return false;
        }
        return true;
    }

    get tiles(){
        return this.#tiles;
    }

    get shipId() {
        return this.#shipId;
    }

    get startingTile() {
        return this.#startingPosition;
    }

    get name(){
        return this.#name;
    }
}

/**
 * Contains all ships that are currently placed on the field
 * @type {[Ship]}
 */
let placedShips = [];
/**
 * 1. total ship count
 * 2. battleships
 * 3. cruisers
 * 4. destroyer
 * 5. submarines
 * @type {number[]}
 */
let shipCounts = [0, 0, 0, 0, 0];
const maxShipCounts = [10, 1, 2, 3, 4];
export const Placements = {
    /**
     * @param vector {Vector}
     * @return {number} 0 = miss, 1 = hit, 2 = destroyed
     */
    hitsShip(vector){
        for(let ship of placedShips){
            let hitTile = ship.getTileByVector(vector);
            if(hitTile !== null){
                let allHit = true;
                for(let tile of ship.tiles){
                    if(tile === hitTile) continue;
                    if(!tile.isShot) allHit = false;
                }
                return allHit? 2 : 1;
            }
        }
        return 0;
    },

    isGameOver(){
        for(let ship of placedShips){
            if(!ship.isDestroyed) return false;
        }
        return true;
    },

    /**
     * Hits the ship's tile that owns the given coordinate
     * @param coordinate {Vector}
     */
    hitShip(coordinate){
        this.getShipFromVector(coordinate)?.hitTile(coordinate);
    },

    /**
     * uses getShipIdByVectors() and generateDirectionByVectors() to build a ship
     * and then passes it to placeShip()
     * @param coordinates {[Vector]}
     * @return {[Ship, number]}
     * 1 if the ship cannot be placed there,
     * 2 if the amount of Ships (total or of just this kind) is maxed
     */
    placeShipByVectors(coordinates){
        const shipId = this.getShipIdByVectors(coordinates);
        const shipDir = this.generateDirectionByVectors(coordinates);

        if(shipId === ShipId.Default || shipDir === Direction.Default){
            this.addError("Illegal shipId or direction");
            return [null, 1];
        }
        let ship = new Ship(coordinates[0], shipDir, shipId);
        return [ship, this.placeShip(ship)];
    },
    /**
     *
     * @param ship{Ship}
     * @return {number} 0 for success,
     * 1 if the ship cannot be placed there,
     * 2 if the amount of Ships (total or of just this kind) is maxed
     */
    placeShip(ship) {
        if(shipCounts[0] >= maxShipCounts[0]){
            this.addError("All ships are maxed out");
            return 2;
        }

        if(shipCounts[ship.shipId] >= maxShipCounts[ship.shipId]){
            this.addError(ship.name + " is maxed out");
            return 2;
        }

        if(!this.canPlace(ship)){
            this.addError("Coordinates are already reserved");
            return 1;
        }

        shipCounts[0] = placedShips.push(ship);
        shipCounts[ship.shipId]++;
        console.log("Ship added: ");
        console.log(ship);
        return 0;
    },
    
    /**
     *
     * @param ship{Ship}
     * @return {boolean}
     */
    canPlace(ship) {
        let shipCoordinates = ship.getTileVectors();

        for(let coordinate of shipCoordinates){
            if(!this.checkPosition(coordinate)) return false;
        }
        
        return true;
    },

    /**
     *
     * @param coordinate{Vector}
     * @return {boolean}
     */
    checkPosition(coordinate) {
        // Coordinates in bounds
        if(coordinate.x >= defaultSize
        || coordinate.x < 0
        || coordinate.y >= defaultSize
        || coordinate.y < 0){
            this.positionError("coordinate out of bounds", coordinate)
            return false;
        }

        // Coordinate is free to use
        for(let ship of placedShips){
            // coordinate is on top of a ship
            if(ship.getTileByVector(coordinate) !== null){
                this.positionError("already placed ship here", coordinate)
                return false;
            }

            // coordinate is beside a ship
            for(let placedVector of ship.getTileVectors()){
                let xDiff = Math.abs(coordinate.x - placedVector.x);
                let yDiff = Math.abs(coordinate.y - placedVector.y);
                if(xDiff <= 1 && yDiff <= 1){
                    this.positionError("placed ship nearby", coordinate);
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * Returns the ship that owns the given vector
     * @param vector {Vector}
     * @return {Ship|null}
     */
    getShipFromVector(vector){
      for(let ship of placedShips){
          if(ship.getTileByVector(vector)) return ship;
      }
      return null;
    },

    /**
     * @param vectors {Vector[]}
     * @return {number}
     */
    getShipIdByVectors(vectors) {
        if (this.generateDirectionByVectors(vectors) === Direction.Default) return ShipId.Default;

        switch (vectors.length) {
            case 2:
                return ShipId.Submarine;
            case 3:
                return ShipId.Destroyer;
            case 4:
                return ShipId.Cruiser;
            case 5:
                return ShipId.Battleship;
            default:
                return ShipId.Default;
        }
    },

    /**
     *
     * @param vectors {Vector[]}
     * @return {number}
     */
    generateDirectionByVectors(vectors) {
        if (vectors === null || vectors.length < 2 || vectors.length > 5) return Direction.Default;

        // Check if the tiles are all in one direction
        let vDirection = vectors[0].directionFrom(vectors[1]);
        for (let i = 0; i < vectors.length - 1; i++) {
            if (vectors[i].add(vDirection).distanceFrom(vectors[i + 1]) !== 0)
                return Direction.Default;
        }

        if (vDirection.x !== 0)
            return vDirection.x > 0 ? Direction.East : Direction.West;
        if (vDirection.y !== 0)
            return vDirection.y > 0 ? Direction.South : Direction.North;

        return Direction.Default;
    },

    getShipCount(shipId = ShipId.Default) {
        return shipCounts[shipId];
    },

    getMaxShipCount(shipId = ShipId.Default) {
        return maxShipCounts[shipId];
    },

    getSpareShipCount(shipId = ShipId.Default) {
        return this.getMaxShipCount(shipId) - this.getShipCount(shipId);
    },

    addError(message){
        console.log("Skip add: " + message);
    },

    positionError(message, coordinate){
        console.log("Illegal position: " + message + ": " + (String.fromCharCode('A'.charCodeAt(0) + coordinate.x)) + "" + coordinate.y)
    },

    clear(){
        placedShips = [];
        shipCounts = [0, 0, 0, 0, 0];
    }
}