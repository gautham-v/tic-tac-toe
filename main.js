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
    const playBtn = document.querySelector('.playBtn');
    const resetBtn = document.querySelector('.resetBtn');
    const btns = document.querySelectorAll('.gameBtn');
    
    const player1 = Player(p1Name.value, 'X');
    const player2 = Player(p2Name.value, 'O');
    let currentPlayer = player1;

    const init = (event) => {
        console.log('Game Started!');
        event.preventDefault();
        btns.forEach((btn)=>{
            btn.addEventListener('click', addMark);
        });
        resetBtn.addEventListener('click', reset);
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
        console.log(gameover);
        if (gameover){
            console.log('GAME OVER!');
            btns.forEach((btn)=>{
                btn.removeEventListener('click', addMark);
            });
            playBtn.innerHTML = 'Play Again';
            playBtn.addEventListener('click',reset);
            if (resetBtn.parentNode != null){
                resetBtn.parentNode.removeChild(resetBtn);
            }
        }
        else{
            changeTurn();
        }
    };

    const reset = (event) => {
        console.log('Game Reset!');
        btns.forEach((btn)=>{
            btn.innerHTML = '&nbsp;';
        });
        currentPlayer = player1;
        Gameboard.update();
    }

    return {
        init,
        player1,
        player2,
        playBtn,
        btns,
    }
})();

const Gameboard = (() => {
    let gameboard = [];

    const update = () => {
        gameboard = []
        Display.btns.forEach(function(btn){
            gameboard.push(btn.textContent);
        });
        return gameboard;
        
    };

    const checkForWinningCombo = () => {
        //winning combos from 0
        const winningCombos = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
        let currentOpositions = [];
        let currentXpositions = [];
        let gameover = false;
        
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
                gameover = true;
            }
            else if (item.every(val => currentXpositions.includes(val))){
                console.log(`${Display.player1.getName()} wins!!!`);
                gameover = true;
            }
        });
        if (currentOpositions.length + currentXpositions.length === 9){
            console.log('Tie Game!');
            gameover = true;
        }
        return gameover;
    };
    return {
        update,
        checkForWinningCombo,
    }
})();

//game flow

Display.playBtn.addEventListener('click',Display.init);
