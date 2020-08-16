let matrix = []; 
let rows = 55; 
let columns = 70; 

for (let y = 0; y < rows; y++) {
matrix[y] = []; 
for (let x = 0; x < columns; x++) {
let a = Math.floor(Math.random()*100);
if (a >= 0 && a < 10) {
matrix[y][x] = 0; 
} 
if (a >= 10 && a < 30) {
matrix[y][x] = 1; 
} 
else if (a >= 30 && a < 80) {
matrix[y][x] = 2; 
} 
else if (a >= 80 && a < 87) {
matrix[y][x] = 3; 
}      
else if(a >= 87 && a < 99) {
matrix[y][x] = 4; 
} 
else if(a >= 99 && a < 100) {
matrix[y][x] = 5; 
} 
}
}
let side = 15;
let grassArr=[];
let eatArr = [];
let gishatichArr = [];
let jurArr = [];
let mardArr = []; 

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for(var y = 0; y < matrix.length; ++y){
        for(var x = 0; x < matrix[y].length; ++x){
            if(matrix[y][x] == 1){
                var gr = new Grass(x,y);
                grassArr.push(gr);
            }
            else if(matrix[y][x] == 2){
                let eatgrass = new Eatgrass(x,y);
                eatArr.push(eatgrass);
            }
            else if(matrix[y][x] == 3){
                let gishatich = new Predator(x,y);
                gishatichArr.push(gishatich);
            }	
            else if(matrix[y][x] == 4){
                let norjur = new Jur(x,y);
                jurArr.push(norjur);
            }
            else if(matrix[y][x] == 5){
                let mard = new Mard(x,y);
                mardArr.push(mard);
            }
        }
    }
     
     
}
function draw() {
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2){
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3){
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4){
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5){
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for(var i in grassArr){
        grassArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in jurArr) {
        jurArr[i].move();
    }
    for (var i in mardArr) {
        mardArr[i].eat();
    }
}

