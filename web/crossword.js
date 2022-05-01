function setLetter(i,j,letter) {
    w = 8
    index = i+(j*w)

    document.getElementById(index.toString()).innerHTML = letter.toString()
}


function placeCursor(i,direction) {
    //Place the cursor on the tile the clue begins in.
    //Set it so when the user types something the cursor goes to the appropriate square.
    
}