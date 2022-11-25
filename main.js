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
            btn.addEventListener('click', currentPlayer.addMark);
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
        const winningCombos = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
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
        winningCombos.forEach((item)=>{
            if (item.every(val => currentOpositions.includes(val))){
                console.log('O wins');
                return true;
            }
            else if (item.every(val => currentXpositions.includes(val))){
                console.log('X wins');
                return true;
            }
        });
        if (currentOpositions.length + currentXpositions.length === 9){
            console.log('Tie Game!');
            return true;
        }
        return false;
    };
    return {
        gameboard,
        update,
        checkForWinningCombo,
    }
})();

const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    const testHello = () => console.log('hello world');
    const changeTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
    }
    const addMark = (event) => {
        if (event.target.innerHTML === '&nbsp;'){
            event.target.innerHTML = currentPlayer.getMarker();
        }
        //update gameboard
        Gameboard.update();
        const gameover = Gameboard.checkForWinningCombo();
        if (gameover){
            console.log('GAME OVER!');
        }
        else{
            changeTurn();
        }
    };
    return {getName, getMarker, testHello, addMark};
};

const player1 = Player('Gautham', 'X');
const player2 = Player('Sham', 'O');
var currentPlayer = player1;

Display.init();
