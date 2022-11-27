const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    name;
    marker;
    return {getName, getMarker, name, marker};
};

const Display = (() => {

    const p1Name = document.querySelector('#p1');
    const p2Name = document.querySelector('#p2');
    
    const player1 = Player(p1Name.value, 'X');
    const player2 = Player(p2Name.value, 'O');
    let currentPlayer = player1;

    const init = (event) => {
        console.log('Game Started!');
        event.preventDefault();
        //Display.createPlayers();
        btns.forEach((btn)=>{
            btn.addEventListener('click', addMark);
        });
    };

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

    return {
        init,
        player1,
        player2
    }
})();

const Gameboard = (() => {
    let gameboard = [];

    const update = () => {
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
                
                console.log(`${Display.player2.getName()} wins!!!`);
                return true;
            }
            else if (item.every(val => currentXpositions.includes(val))){
                console.log(`${Display.player1.getName()} wins!!!`);
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
        update,
        checkForWinningCombo,
    }
})();

//game flow
const playBtn = document.querySelector('.playBtn');
const btns = document.querySelectorAll('.gameBtn');

playBtn.addEventListener('click',Display.init);