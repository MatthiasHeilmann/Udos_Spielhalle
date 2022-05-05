import {defaultSize} from "/js/svCanvasDrawer.js";

const Direction = {
    Default: 0,
    North: 1,
    East: 2,
    South: 3,
    West: 4
};

const ShipId = {
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
class Vector {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    add(v) {
        return new Vector(this.#x + v.x(), this.#y + v.y());
    }

    /**
     * Calculates the x and y distance of this vector to the given one
     * @param v {Vector}
     * @return {number} addition of x and y distances dx+dy
     */
    distanceFrom(v) {
        let distance = 0;
        distance += Math.abs(this.#x - v.x());
        distance += Math.abs(this.#y - v.y());

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
    #defaultColour = "#ffffff";
    #shotColour = "#ff0000";
    #battleshipColour = "#7400b8";
    #cruiserColour = "#5e60ce";
    #destroyerColour = "#74c69d";
    #submarineColour = "#40916c";

    #ownerId;
    #isShot = false;

    constructor(ownerShip) {
        this.#ownerId = ownerShip;
    }

    getColour() {
        if (this.#isShot) return this.#shotColour;

        switch (this.#ownerId) {
            case ShipId.Submarine:
                return this.#submarineColour;
            case ShipId.Destroyer:
                return this.#destroyerColour;
            case ShipId.Cruiser:
                return this.#cruiserColour;
            case ShipId.Battleship:
                return this.#battleshipColour;
        }
        return this.#defaultColour;
    }

    shoot() {
        this.#isShot = true;
    }

    get isShot() {
        return this.#isShot;
    }
}

class Ship {
    #name = "Default";
    #shipId = ShipId.Default;
    #startingPosition = new Vector(0, 0);
    #direction = Direction.Default;
    #length = 0;
    #tiles = [];
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
            tileVectors.push(() => {
                switch (this.#direction) {
                    case Direction.North:
                        return new Vector(this.#startingPosition.x(), this.#startingPosition.y() - i);
                    case Direction.East:
                        return new Vector(this.#startingPosition.x() + i, this.#startingPosition.y());
                    case Direction.South:
                        return new Vector(this.#startingPosition.x(), this.#startingPosition.y() + i);
                    case Direction.West:
                        return new Vector(this.#startingPosition.x() - i, this.#startingPosition.y());
                }
            })
        }
        return tileVectors;
    }

    /**
     *
     * @param v {Vector}
     */
    getTileByVector(v) {
        try {
            switch (this.#direction) {
                case Direction.North:
                case Direction.South:
                    if (this.#startingPosition.x() - v.x() === 0) {
                        return this.#tiles[Math.abs(this.#startingPosition.y() - v.y())];
                    }
                    break;
                case Direction.East:
                case Direction.West:
                    if (this.#startingPosition.y() - v.y() === 0) {
                        return this.#tiles[Math.abs(this.#startingPosition.x() - v.x())];
                    }
            }
        } catch (error) {
            console.log("Tile is not part of this ship");
        }
        return null;
    }

    buildTiles() {
        for (let i = 0; i < length; i++) {
            this.#tiles.append(new Tile(this.#shipId));
        }
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
const Placements = {
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

        if(shipCounts[ship.shipId()] >= maxShipCounts[ship.shipId()]){
            this.addError(ship.name() + " is maxed out");
            return 2;
        }

        if(!this.canPlace(ship)){
            this.addError("Coordinates are already reserved");
            return 1;

        }

        shipCounts[0] = placedShips.push(ship);
        shipCounts[ship.shipId()]++;
        console.log("Ship added: " + ship);
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
        if(coordinate.x() >= defaultSize
        || coordinate.x() < 0
        || coordinate.y() >= defaultSize
        || coordinate.y() < 0){
            this.positionError("coordinate out of bounds", coordinate)
            return false;
        }

        // Coordinate is free to use
        for(let placedShip of placedShips){
            // coordinate is on top of a ship
            if(!placedShip.getTileByVector(coordinate)){
                this.positionError("already placed ship here")
                return false;
            }

            // coordinate is beside a ship
            for(let placedVector of placedShip.getTileVectors()){
                let xDiff = Math.abs(coordinate.x() - placedVector.x());
                let yDiff = Math.abs(coordinate.y() - placedVector.y());
                if(xDiff <= 1 && yDiff <= 1){
                    this.positionError("placed ship nearby");
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * @param vectors {Vector[]}
     * @return {number}
     */
    getShipIdByVectors(vectors) {
        if (!this.generateDirectionByTiles(vectors)) return ShipId.Default;

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
     * @return {null|number}
     */
    generateDirectionByTiles(vectors) {
        if (vectors.length < 2 || vectors.length > 5) return Direction.Default;

        // Check if the tiles are all in one direction
        let vDirection = vectors[0].directionFrom(vectors[1]);
        for (let i = 0; i < vectors.length - 1; i++) {
            if (vectors[i].add(vDirection).distanceFrom(vectors[i + 1]) !== 0)
                return Direction.Default;
        }

        if (!vDirection.x())
            return vDirection.x() > 0 ? Direction.East : Direction.West;
        if (!vDirection.y())
            return vDirection.y() > 0 ? Direction.North : Direction.South;

        return Direction.Default;
    },

    getShipCount() {
        return shipCounts[0];
    },

    addError(message){
        console.log("Skip add: " + message);
    },

    positionError(message, coordinate){
        console.log("Illegal position: " + message + ": " + ('A'.charAt(0) + coordinate.x()) + "" + coordinate.y())
    },

    clear(){
        placedShips = [];
        shipCounts = [0, 0, 0, 0, 0];
    }
}