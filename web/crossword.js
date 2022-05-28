const WIDTH = 10
pressed_key = ''
cursor = 0
cursor_direction = ""
player_grid = []

function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return parseInt(channelA+channelB);
}

function getI(index) {

    if (index%WIDTH == 0) {
        return index/WIDTH-1
    }

    return Math.floor(index/WIDTH)
}

function getJ(index) {
    if (index%WIDTH == 0) {
        return WIDTH-1
    }
    return index%WIDTH-1
}


function resetColors() {
    //Reset background color

    // const red = [255,0,0]
    // const green = [0,255,0]
    // const blue = [0,0,255]
    // const yellow = [255,255,0]
    // const purple = [255,0,255]
    // const orange = [255,165,0]
    // const pink = [255,192,203]
    

    for (var j = 0; j < WIDTH; j++) {
        for (var k = 0; k < WIDTH; k++) {
            
            
            
            setTile(j,k,(grid[j][k] == ' ')? 'blank':'filled')
        }
    }
}

function incrementCursor() {
    cursor += (cursor_direction == 'across'? 1:WIDTH)

    if (cursor > WIDTH)
        cursor = WIDTH

}

function decrementCursor() {
    cursor -= (cursor_direction == 'across'? 1:WIDTH)

    if (cursor <= 0)
        cursor = 1
}

function removeLetter(index) {

    i = Math.floor(index/WIDTH)
    j = index%WIDTH-1

    document.getElementById('letter-'+index).innerHTML = ' '

    player_grid[i][j] = ' '
    
}

function addLetter(index, letter) {
    i = getI(index)
    j = getJ(index)

    document.getElementById('letter-'+index).innerHTML = letter

    player_grid[i][j] = letter
}

function getLetter(index) {
    return document.getElementById('letter-'+index).innerHTML
}


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

        if ( cursor - (cursor_direction == 'across'? 1:WIDTH) <= 0)
            return
        
        //Remove current letter at cursor
        previous_cursor = cursor - (cursor_direction == 'across'? 1:WIDTH)
        
        removeLetter(previous_cursor)

        next_cursor = cursor - (cursor_direction == 'across'? 1:WIDTH)
        
        if (!isBlackTile(next_cursor)) {
            cursor = next_cursor
        }

        return
    }
      

    //Check if the key is a letter
    if (event.key.length != 1 || !event.key.match(/[a-zġħżċ]/i)) {
        return
    }

    //Turn letter to lower case
    pressed_key = event.key.toLowerCase()


    //If previous letter is i and current letter is e, set previous letter to ie
    previous_cursor = cursor - (cursor_direction == 'across'? 1:WIDTH)
    
    if (previous_cursor <= 0) {
        previous_cursor = 0
    } else {
        //Abstract into function
        previous_letter = getLetter(previous_cursor)
    }
    

    if (previous_cursor != 0 && previous_letter == 'i' && pressed_key == 'e') {
        addLetter(previous_cursor,'ie')
    } else if (previous_cursor != 0 && previous_letter == 'g' && pressed_key == 'ħ') {
        addLetter(previous_cursor,'għ')
    } else if (isPinkTile(cursor)){
        
        //Place letter in cursor. TODO: Make this reliable. Abstract into function
        addLetter(cursor,pressed_key)
        
        //Move cursor to next tile
        next_cursor = cursor + (cursor_direction == 'across'? 1:WIDTH)
    }


    //Remove cursor if end of word is reached
    if (isPinkTile(next_cursor)) {
        cursor = next_cursor
    }
    
    if (player_win()) {
        alert('You win!')
    }





}


function player_win() {
    return player_grid.toString() == grid.toString()
}

function isPinkTile() {
    return (document.getElementById('letter-'+cursor).style.backgroundColor == 'pink')
}


function placeCursor(i,direction) {
    

    resetColors()

    //Make all tiles have no text decoration
    for (var j = 0; j < WIDTH*WIDTH; j++) {
        document.getElementById('letter-'+(j+1)).style.textDecoration = 'none'
    }

    if (direction == 'across') {
        cursor = (wordlist[0][i-1][0]*WIDTH+wordlist[0][i-1][1])+1
        word = wordlist[0][i-1][3]
    } else {
        cursor = (wordlist[1][i-1][0]*WIDTH+wordlist[1][i-1][1])+1
        word = wordlist[1][i-1][3]
    }
    
    cursor_direction = direction
    
    next_cursor = cursor
        

    // console.log(word)

    j = 0
    //Highlight tiles selected
    while (j++ != word.length) {
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

function setHints() {
    for (var i = 0; i < wordlist[0].length; i++) {
        document.getElementById('across-button-'+(i+1)).textContent = wordlist[0][i][2]
    }
    for (var i = 0; i < wordlist[1].length; i++) {
        document.getElementById('down-button-'+(i+1)).textContent = wordlist[1][i][2]
    }
}

function initGrid() {  
    generateGrid()
    resetColors()
    
    //Update indices in hint-across containers
    for (let i = 0; i < wordlist[0].length; i++) {
        document.getElementById('across-index-'+(i+1).toString()).innerHTML = (wordlist[0][i][0]*WIDTH+wordlist[0][i][1]+1).toString()+'.'
    }
    
    //Update indices in hint-down containers
    for (let i = 0; i < wordlist[1].length; i++) {
        document.getElementById('down-index-'+(i+1).toString()).innerHTML = (wordlist[1][i][0]*WIDTH+wordlist[1][i][1]+1).toString()+'.'
    }
    
    setHints()


}

function isBlackTile(i) {
    i--;
    if (i > WIDTH*WIDTH) {
        return true
    }

    return (grid[Math.floor(i/WIDTH)][i%WIDTH] == ' ')
}

function isStartingTileIndex(index) {
    i--;

    if (index > WIDTH*WIDTH) {
        return true;
    }

    //Turn index into i and j
    i = Math.floor(index/WIDTH)
    j = index%WIDTH


    for (var k = 0; k < wordlist[0].length; k++) {
        if (wordlist[0][k][0] == i && wordlist[0][k][1] == j) {
            // console.log('!')
            return true
        }
    }
 
    for (var k = 0; k < wordlist[1].length; k++) {
         if (wordlist[1][k][0] == i && wordlist[1][k][1] == j) {
            // console.log('!')
            return true
         }
     }
 
     return false
 
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

function addWord(word,i,j,direction) {
    
    for (var k = 0; k < word.length; k++) {
        
        if (k > 0 && word[k] == 'ħ' && word[k-1] == 'g') {
            i -= direction == 'down'? 1:0
            j -= direction == 'down'? 0:1
            grid[i][j] = 'għ'
        }
        else if (k > 0 && word[k] == 'e' && word[k-1] == 'i') {
            i -= direction == 'down'? 1:0
            j -= direction == 'down'? 0:1
            grid[i][j] = 'ie'
        } else {
            grid[i][j] = word[k]
        }
        
        i += direction == 'down'? 1:0
        j += direction == 'down'? 0:1

    }
}

function filled(i,j) {
    return grid[i][j] != ''
}

function randInt(min,max) {
    max++
    return Math.floor(Math.random() * (max - min) + min)
}

function getEmptyPosition(word, dir) {

    for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < WIDTH-word.length; j++) {

            valid = true

            for (var k = 0; k < word.length; k++) {

                if ((dir == 'across' && grid[i][j+k] != ' ') ||
                    (dir == 'down' && grid[j+k][i] != ' ')){
                    
                    valid = false
                    break
                }
            }
            
            if (valid) return [i,j]

        }
    }

    return [-1,-1]

}

function tokenise(words) {

    new_words = []

    for (i in words) {
        x = []
        cursor = 0

        for (j in words[i]) {
            
            if (j > 0 && words[i][j-1] == 'g' && words[i][j] == 'ħ')
                x[--cursor] = 'għ'

            else if (j > 0 && words[i][j-1] == 'i' && words[i][j] == 'e')
                x[--cursor] = 'ie'
            
            else x[cursor] = words[i][j]

            cursor ++

        }

        new_words.push(x)
        
    }
    // console.log(new_words)

    return new_words
    



}

function generateGrid() {

    try {
        for (i = 0; i < glosses.length; i++) {
            clues.push(glosses[i].split(',')[0])
        } 
        words = tokenise(lemmas)
    
            
        //Place first word randomly in grid
        i = randInt(0,WIDTH-words[0].length)
        j = randInt(0,WIDTH-words[0].length)
        
        dir = randInt(0,1) 
    
        addWord(words[0],i,j,['across','down'][dir])
        wordlist[dir].push([i,j,clues[0],words[0]])
    
        
    
        //For all words traverse grid and attempt to find the position with the highest intersections
        for (var w = 1; w < words.length; w++) {
            word = words[w]
            max_across = 0
            max_down   = 0
            
            //Choose an initial position with no overlaps
            pos_across = getEmptyPosition(word,'across')
            pos_down   = getEmptyPosition(word,'down')
            
    
            //Slide word over grid, across and down
            for (var i = 0; i < WIDTH; i++) {
                for (var j = 0; j < (WIDTH-word.length)+1; j++) {
                    
                    across_num = 0
                    down_num   = 0
    
                    stop_across = false
                    stop_down = false
                    
                    leave = false
    
                    //Dont make words spawn adjacent to each other
                    // if (j > 0 && grid[i][j-1] != ' ') {
                    //     console.log('Cannot place ',word, 'across at ',i,j)
                    //     leave = true
                    // }
    
                    // if (j > 0 && grid[j-1][i] != ' ') {
                    //     console.log('Cannot place ',word, 'down at ',i,j)
                    //     leave = true
                    // } else leave = false;
    
                    // if (leave) {
                    //     console.log('.')
                    // }continue
    
    
                    for (var k = 0; k < word.length; k++) {
                        
                        //Slide Across
    
                        if (!stop_across) {
                            if (word[k] == grid[i][j+k]) {
                                across_num ++
                            }
                            
                            //Intersection overlaps other word
                            else if (grid[i][j+k] != ' ') {
                                across_num  = -1
                                stop_across = true
                            }
                        }
                        
                        if (!stop_down) {
                            // Slide Down                    
                            if (word[k] == grid[j+k][i]) {
                                down_num ++
                            }
        
                            //Intersection overlaps other word
                            else if (grid[j+k][i] != ' ') {
                                down_num  = -1
                                stop_down = true
                            }
    
                        }
                       
                    }
                    
                    if (across_num > max_across) {
                        max_across = across_num
                        pos_across = [i,j]
                    }
                    
                    if (down_num > max_down) {
                        max_down = down_num;
                        pos_down = [j,i]
                    }
                }
            }
    
            //Pick highest number from map
            if (max_across >= max_down) {
                //Add word across
                addWord(word,pos_across[0],pos_across[1],'across')
                wordlist[0].push([pos_across[0],pos_across[1],clues[w],word])
            }
            else {
                //Add word down
                addWord(word,pos_down[0],pos_down[1],'down')
                wordlist[1].push([pos_down[0],pos_down[1],clues[w],word])
            }
            
        }
        
    } catch (error) {
        grid = [
            /*  0   1   2    3   4   5   6   7   8   9 */
         /*0*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*0*/
         /*1*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*1*/
         /*2*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*2*/
         /*3*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*3*/
         /*4*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*4*/
         /*5*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*5*/
         /*6*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*6*/
         /*7*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*7*/
         /*8*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*8*/
         /*9*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*9*/
            /*  0   1   2    3   4   5   6    7   8   9 */
            ];
        
        player_grid = [
            /*  0   1   2    3   4   5   6   7   8   9 */
            /*0*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*0*/
            /*1*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*1*/
            /*2*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*2*/
            /*3*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*3*/
            /*4*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*4*/
            /*5*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*5*/
            /*6*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*6*/
            /*7*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*7*/
            /*8*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*8*/
            /*9*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*9*/
            /*  0   1   2    3   4   5   6    7   8   9 */
            ];
        
        wordlist = [[],[]]
        words = []

        glosses = []
        lemmas = []

        clues = []
        getWords()
    }


    
}


// Create a dummy array of cars to send to the server:
const cars = [
	{ "make":"Porsche", "model":"911S" },
	{ "make":"Mercedes-Benz", "model":"220SE" },
	{ "make":"Jaguar","model": "Mark VII" }
];
// Create an event listener on the button element:
function getWords(){
    var data = {}
    // Get the reciever endpoint from Python using fetch:
    fetch("http://127.0.0.1:5000/getwords", 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },body:JSON.stringify(cars)})
            
            .then(res=>{
                if(res.ok){
                    return res.json()
                }else{
                    alert("something is wrong")
                }})
            
            .then(jsonResponse=>{
                glosses = Object.values(jsonResponse['glosses'])
                lemmas = Object.values(jsonResponse['lemma'])
                console.log(lemmas)
                initGrid()
                
                
            } 
            ).catch((err) => console.error(err));
    
            
}


var grid = [
    /*  0   1   2    3   4   5   6   7   8   9 */
 /*0*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*0*/
 /*1*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*1*/
 /*2*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*2*/
 /*3*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*3*/
 /*4*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*4*/
 /*5*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*5*/
 /*6*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*6*/
 /*7*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*7*/
 /*8*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*8*/
 /*9*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*9*/
    /*  0   1   2    3   4   5   6    7   8   9 */
    ];

var player_grid = [
    /*  0   1   2    3   4   5   6   7   8   9 */
    /*0*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*0*/
    /*1*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*1*/
    /*2*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*2*/
    /*3*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*3*/
    /*4*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*4*/
    /*5*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*5*/
    /*6*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*6*/
    /*7*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*7*/
    /*8*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*8*/
    /*9*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*9*/
    /*  0   1   2    3   4   5   6    7   8   9 */
    ];

var wordlist = [[],[]]
var words = []

var glosses = []
var lemmas = []

var clues = []


// var grid = [
//     /*  0   1   2    3   4   5   6   7   8   9 */
//  /*0*/[' ','m','e', 'x','x','a',' ' ,' ',' ',' '],/*0*/
//  /*1*/[' ',' ',' ', ' ','i','j',' ' ,' ',' ',' '],/*1*/
//  /*2*/[' ',' ','r', 'i','k','k','i' ,' ','b',' '],/*2*/
//  /*3*/[' ',' ',' ', 'b','e','l','u' ,' ','a',' '],/*3*/
//  /*4*/[' ',' ',' ', ' ','l','a',' ' ,'ġ','j',' '],/*4*/
//  /*5*/[' ',' ',' ', ' ',' ',' ',' ' ,'e','d',' '],/*5*/
//  /*6*/[' ',' ','għ','a','j','j','ie','n','a',' '],/*6*/
//  /*7*/[' ',' ',' ', ' ',' ',' ',' ' ,'n',' ',' '],/*7*/
//  /*8*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*8*/
//  /*9*/[' ',' ',' ', ' ',' ',' ',' ' ,' ',' ',' '],/*9*/
//     /*  0   1   2    3   4   5   6    7   8   9 */
//     ];

// var wordlist = [[[0,1],[2,2],[3,3],[6,2]],
//                 [[0,4],[0,5],[2,7],[2,8],[4,7]]]