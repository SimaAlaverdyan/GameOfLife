class Grass{
    constructor(x, y) {
       this.x = x;
       this.y = y;
       this.multiply = 0;
       this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
    ];
    }
    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){

            if (matrix[y][x] == 0) {
                found.push(this.directions[i]);
            }
        }
        }
        return found;
     }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;  
        }
    }
    
}
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 0;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiply == 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) { 
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            matrix[y][x] = 2;
            this.multiply = 0;
        } 
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
                break;
            }
        }
    }
}    
class Predator
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 5;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
        
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
                   
            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiply >= 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) { 
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norgishatich = new Predator(x, y);
            gishatichArr.push(norgishatich);

            matrix[y][x] = 3;
            this.multiply = 0;
        } 
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
                break;
            }
        }
    }
}    
class Jur
{
    constructor(x, y) {
            this.x = x;
            this.y = y;
            this.multiply = 0;
            this.directions =[];
        }
    
    newDirections() {
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }
    chooseCell(t) {
            this.newDirections();
            var found = [];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == t) {
                        found.push(this.directions[i]);
                    }
                }
            }
        return found;
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;
            grassArr.push(new Grass(this.x,this.y))

            this.x = x;
            this.y = y;
        }
    }
}

class Mard
{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 6;
        this.energy = 6;
        this.directions =[];
    }

    newDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var foundCords1 = this.chooseCell(0);
        var foundCords2 = this.chooseCell(1);
        var foundCords = foundCords1.concat(foundCords2);
        var cord = random(foundCords);
        

        if (cord) {
            var x = cord[0];
            var y = cord[1];
        if (matrix[y][x] == 0)
        {
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
        }    
        else if (matrix[y][x] == 1){
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 1;
        }
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(3);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            if (this.multiply == 20) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();
           this.energy++;
            if (this.energy <= 0) { 
                this.die();
            }
    }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norMard = new Mard(x, y);
            mardArr.push(norMard);

            matrix[y][x] = 5;
            this.multiply = 0;
        } 
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in mardArr) {
            if (this.x == mardArr[i].x && this.y == mardArr[i].y) {
                mardArr.splice(i, 1);
                break;
            }
        }
    }
}
