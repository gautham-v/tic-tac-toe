const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    name;
    marker;

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
            Display.changeTurn();
        }
    };

    const init = () => {
        console.log('Game Started!');
        
        btns.forEach((btn)=>{
            btn.addEventListener('click', addMark);
        });
    };
    
    return {getName, getMarker, addMark, name, marker, init};
};

const Display = (() => {

    const changeTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
    }
    return {
        //init,
        changeTurn,
    }
})();

const Gameboard = (() => {
    let gameboard = [];

    const update = () => {
        //btns = Display.btns;
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
                
                console.log(`${player2.getName()} wins!!!`);
                return true;
            }
            else if (item.every(val => currentXpositions.includes(val))){
                console.log(`${player1.getName()} wins!!!`);
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

//game flow
let player1 = {};
let player2 = {};
let currentPlayer = {};
const playBtn = document.querySelector('.playBtn');
const btns = document.querySelectorAll('.gameBtn');

playBtn.addEventListener('click',createPlayers);

function createPlayers(event) {
    const p1Name = document.querySelector('#p1');
    const p2Name = document.querySelector('#p2');
    event.preventDefault();
    
    player1 = Player(p1Name.value, 'X');
    player2 = Player(p2Name.value, 'O');
    currentPlayer = player1;
    currentPlayer.init();
}