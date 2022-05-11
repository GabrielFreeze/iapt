const WIDTH = 10
pressed_key = ''
cursor = 0
cursor_direction = ""



function keyboardListener() {

    if (cursor == 0)
        return

    //Make all tiles have no text decoration
    for (var i = 0; i < WIDTH*WIDTH; i++) {
        document.getElementById('letter-'+(i+1)).style.textDecoration = 'none'
    }



    //Make text at cursor underlined
    document.getElementById('letter-'+cursor).style.textDecoration = 'underline'

    //Check if key is backspace
    if (event.key == 'Backspace') {
        //Remove current letter at cursor
        document.getElementById('letter-'+(cursor-(cursor_direction == 'across'? 1:WIDTH).toString())).innerHTML = ' '
        
        next_cursor = cursor - (cursor_direction == 'across'? 1:WIDTH)
        
        //Remove cursor if end of word is reached
        if (isBlackTile(next_cursor)) {
            cursor = 0

            //Reset background color
            for (var j = 0; j < WIDTH; j++) {
                for (var k = 0; k < WIDTH; k++) {
                    setTile(j,k,(grid[j][k] == ' ')? 'blank':'filled')
                }
            }
        } else {
            cursor = next_cursor
        }

        return
    }
        

    //Check if the key is a letter
    if (event.key.length != 1 || !event.key.match(/[a-z]/i)) {
        return
    }

    //Turn letter to lower case
    pressed_key = event.key.toLowerCase()

    //Place letter in cursor
    document.getElementById('letter-'+cursor).innerHTML = pressed_key

    //Move cursor to next tile
    next_cursor = cursor + (cursor_direction == 'across'? 1:WIDTH)


    //Remove cursor if end of word is reached
    if (isBlackTile(next_cursor)) {
        cursor = 0

        //Reset background color
        for (var j = 0; j < WIDTH; j++) {
            for (var k = 0; k < WIDTH; k++) {
                setTile(j,k,(grid[j][k] == ' ')? 'blank':'filled')
            }
        }
    } else {
        cursor = next_cursor
    }
    


}

function placeCursor(i,direction) {
    

    //Reset background color
    for (var j = 0; j < WIDTH; j++) {
        for (var k = 0; k < WIDTH; k++) {
            setTile(j,k,(grid[j][k] == ' ')? 'blank':'filled')
        }
    }

    //Make all tiles have no text decoration
    for (var j = 0; j < WIDTH*WIDTH; j++) {
        document.getElementById('letter-'+(j+1)).style.textDecoration = 'none'
    }

    if (direction == 'across') {
        cursor = (wordlist[0][i-1][0]*WIDTH+wordlist[0][i-1][1])+1
    } else {
        cursor = (wordlist[1][i-1][0]*WIDTH+wordlist[1][i-1][1])+1
    }
    
    cursor_direction = direction


    
    next_cursor = cursor
    //Highlight tiles selected
    while (!isBlackTile(next_cursor)) {
        document.getElementById('letter-'+next_cursor).style.backgroundColor = 'pink'


        next_cursor += (direction == 'across'? 1:WIDTH)
    }



}


function setTile(i,j,state) {
    
    index = j+(i*WIDTH)+1
    div = document.getElementById('letter-'+index)

    if (state == 'blank') {
        //Make background color of div to black
        div.style.backgroundColor = 'black'
        
        //Remove text from div
        div.innerHTML = ' '
    } else if (state == 'filled') {

        //Make number appear on starting tiles
        if (isStartingTile(i,j)) {
            document.getElementById('tile-'+index.toString()).innerHTML = index.toString()
        }

        //Make background color of div to default value
        div.style.backgroundColor = 'whitesmoke'

    }
}


function initGrid() {

    //Set backgrounds and indices
    for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < WIDTH; j++) {
            setTile(i,j,(grid[i][j] == ' ')? 'blank':'filled')
        }
    }

    //Update indices in hint-across containers
    for (let i = 0; i < wordlist[0].length; i++) {
        document.getElementById('across-index-'+(i+1).toString()).innerHTML = (wordlist[0][i][0]*WIDTH+wordlist[0][i][1]+1).toString()+'.'
    }

    //Update indices in hint-down containers
    for (let i = 0; i < wordlist[1].length; i++) {
        console.log(i+1)
        document.getElementById('down-index-'+(i+1).toString()).innerHTML = (wordlist[1][i][0]*WIDTH+wordlist[1][i][1]+1).toString()+'.'
    }



}

function isBlackTile(i) {
    i--;
    if (i > WIDTH*WIDTH) {
        return true
    }

    return (grid[Math.floor(i/WIDTH)][i%WIDTH] == ' ')
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
                    [[0,4],[0,5],[2,7],[2,8]]]