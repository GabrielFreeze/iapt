
function setLetter(i,j,letter) {
    w = 10
    index = i+(j*w)

    document.getElementById(index.toString()).innerHTML = letter.toString()
}


function placeCursor(i,direction) {
    
    
    //Place the cursor on the tile the clue begins in.
    //Set it so when the user types something the cursor goes to the appropriate square.
    
}


function setTile(i,j,state) {
    w = 10
    index = j+(i*w)+1
    div = document.getElementById('letter-'+index.toString())

    if (state == 'blank') {
        //Make background color of div to black
        div.style.backgroundColor = 'black'
        
        //Remove text from div
        div.innerHTML = ' '
    } else if (state == 'filled') {
    
        //Remove any text from div
        // div.innerHTML = ' '
        
        //Make number appear on starting tiles
        if (isStartingTile(i,j)) {
            document.getElementById('tile-'+index.toString()).innerHTML = index.toString()
        }
        
        
        

        //Set number on starting tile.
    }



 
}


function initGrid() {

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            setTile(i,j,(grid[i][j] == ' ')? 'blank':'filled')
        }
    }

}


function isStartingTile(i,j) {
   for (var k = 0; k < wordlist[0].length; k++) {
       if (wordlist[0][k][0] == i && wordlist[0][k][1] == j) {
           return true
       }
   }

   for (var k = 0; k < wordlist[1].length; k++) {
        if (wordlist[1][k][0] == i && wordlist[1][k][1] == j) {
            return true
        }
    }

    return false

}

var grid = [
    /*  0   1   2   3   4   5   6   7   8   9 */
 /*0*/[' ','m','e','x','x','a',' ',' ',' ',' '],/*0*/
 /*1*/[' ',' ',' ',' ','i','j',' ',' ',' ',' '],/*1*/
 /*2*/[' ',' ','r','i','k','k','i','e','b',' '],/*2*/
 /*3*/[' ',' ',' ','b','e','l','u','l','a',' '],/*3*/
 /*4*/[' ',' ',' ',' ','l','a',' ','m','j',' '],/*4*/
 /*5*/[' ',' ',' ',' ',' ',' ',' ','u','d',' '],/*5*/
 /*6*/[' ',' ',' ',' ',' ',' ',' ',' ','a',' '],/*6*/
 /*7*/[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],/*7*/
 /*8*/[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],/*8*/
 /*9*/[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],/*9*/
    /*  0   1   2   3   4   5   6   7   8   9 */
    ];

    var wordlist = [[[0,1],[2,2],[3,3]],
                    [[0,4],[0,5],[2,7],[8,2]]]