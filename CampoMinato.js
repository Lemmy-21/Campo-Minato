var board = [];
var rows = 8;
var columns = 8;

var minesCount = 20;
var minesLocation = [];

var tilesClicked = 0; 

var gameOver = false;

window.onload = function() {
    startGame();
}

function setMines(x, y) {

    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            if(r != y && c != x){
                minesLocation.push(id);
                minesLeft -= 1;
            }
        }
    }

    minesSet = true;
}


function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    minesSet = false;


   
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", rightClickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}


function clickTile() {
    let tile = this;

    if (tile.innerText == ""){
    
        let coords = tile.id.split("-"); 

        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (minesSet == false){
            setMines(c, r);
        }

        if (gameOver || this.classList.contains("tile-clicked")) {
            return;
        }

        if (minesLocation.includes(tile.id)) {
          
            gameOver = true;
            revealMines();
            return;
        }

        checkMine(r, c);
    }

}

function rightClickTile(event) {

    event.preventDefault();
    let tile = this;
    if (tile.innerText == "") {
        tile.innerText = "F";
    }
    else if (tile.innerText == "F") {
        tile.innerText = "?";
    }
    else if (tile.innerText == "?") {
        tile.innerText = "";
    }
    return;
}

function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "!";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

  
    minesFound += checkTile(r-1, c-1);    
    minesFound += checkTile(r-1, c);       
    minesFound += checkTile(r-1, c+1);    

   
    minesFound += checkTile(r, c-1);      
    minesFound += checkTile(r, c+1);      

  
    minesFound += checkTile(r+1, c-1);    
    minesFound += checkTile(r+1, c);     
    minesFound += checkTile(r+1, c+1);    

    if (minesFound > 0) {
        board[r][c].innerText = minesFound; 
    }
    else {
     
        checkMine(r-1, c-1);    
        checkMine(r-1, c);     
        checkMine(r-1, c+1);  

        checkMine(r, c-1);  
        checkMine(r, c+1);     

        checkMine(r+1, c-1);  
        checkMine(r+1, c);      
        checkMine(r+1, c+1);   
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }

}


function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}