//create gameboard
/* 
[0 1 2]
[3 4 5]
[6 7 8]

possible winning combinations

from 0:
[0, 1, 2]
[0, 3, 6]
[0, 4, 8]

from 1:
[1, 4, 7]

from 2:
[2, 4, 6]
[2, 5, 8]

from 3:
[3, 4, 5]

from 6:
[6, 7, 8]

 */

const Display = (() => {
    const btns = document.querySelectorAll('button');
    const init = () => {
        btns.forEach((btn)=>{
            btn.addEventListener('click', player1.addMark);
        });
    };
    return {
        init,
        btns,
    }
})();

const Gameboard = (() => {
    let gameboard = [];

    const update = () => {
        btns = Display.btns;
        gameboard = []
        btns.forEach(function(btn){
            gameboard.push(btn.textContent);
        });
        return gameboard;
        
    };

    const checkForWinningCombo = () => {
        //winning combos from 0
        let gameover = false;
        const winningCombos = '[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]]';
        let currentOpositions = [];
        let currentXpositions = [];
        
        for (let i=0; i<gameboard.length; i++){
            if (gameboard[i] === 'O'){
                currentOpositions.push(i);
            }
            else if (gameboard[i] === 'X'){
                currentXpositions.push(i);
            }
        }
        currentOpositions = JSON.stringify(currentOpositions);
        currentXpositions = JSON.stringify(currentXpositions);
        if ((winningCombos.indexOf(currentOpositions) != -1) || (winningCombos.indexOf(currentXpositions) != -1)){
            gameover = true;
        }
        return gameover;
    };
    return {
        gameboard,
        update,
        checkForWinningCombo,
    }
})();

// function addMark(event){
//     //change text context
//     /* 
//     2. check which users's turn it is
//     3. find that user object's marker
//     4. apply user's marker to empty space
//     5. check for winning combination on the gameboard
//      */
//     if (event.target.innerHTML === '&nbsp;'){
//         event.target.innerHTML = 'O';
//     }
//     //update gameboard
//     Gameboard.update();
//     const gameover = Gameboard.checkForWinningCombo();
//     if (gameover){
//         alert('GAME OVER!');
//     }
//     // update gameboard object
// }

const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const testHello = () => console.log('hello world');
    const addMark = (event) => {
        if (event.target.innerHTML === '&nbsp;'){
            event.target.innerHTML = marker;
        }
        //update gameboard
        Gameboard.update();
        const gameover = Gameboard.checkForWinningCombo();
        if (gameover){
            alert('GAME OVER!');
        }
    };
    return {getName, getMarker, testHello, addMark};
};

const player1 = Player('Gautham', 'X');
const player2 = Player('Sham', 'O');

Display.init();

//gameboard = updateGameboard();
// function checkForWinningCombo(gameboard){
//     //winning combos from 0
//     let gameover = false;
//     const winningCombos = '[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]]';
//     let currentOpositions = [];
//     let currentXpositions = [];

//     for (let i=0; i<gameboard.length; i++){
//         if (gameboard[i] === 'O'){
//             currentOpositions.push(i);
//         }
//         else if (gameboard[i] === 'X'){
//             currentXpositions.push(i);
//         }
//     }

//     currentOpositions = JSON.stringify(currentOpositions);
//     currentXpositions = JSON.stringify(currentXpositions);
//     if ((winningCombos.indexOf(currentOpositions) != -1) || (winningCombos.indexOf(currentXpositions) != -1)){
//         gameover = true;
//     }
//     return gameover;
// }

//create displayController

//create players

//get current gameboard state

//initialize selectors and listeners - should be private in module eventually
/* function init(){
    const btns = document.querySelectorAll('button');

    btns.forEach((btn)=>{
        btn.addEventListener('click', addMark);
    });
    return btns;
} */

/* function updateGameboard(){
    let gameboard = [];
    btns = init();
    btns.forEach(function(btn){
        gameboard.push(btn.textContent);
    });
    return gameboard;
} */

//function checkMark

