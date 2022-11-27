const Player = (name,marker) => {
    name;
    marker;
    return {name, marker};
};

const Game = (() => {

    const p1Name = document.querySelector('#p1');
    const p2Name = document.querySelector('#p2');
    const playBtn = document.querySelector('.playBtn');
    const resetBtn = document.querySelector('.resetBtn');
    const btns = document.querySelectorAll('.gameBtn');
    const result = document.querySelector('.result');
    const container = document.querySelector('.container');
    
    const player1 = Player(p1Name.value, 'X');
    const player2 = Player(p2Name.value, 'O');
    let currentPlayer = player1;

    const init = () => {
        container.style.visibility = 'visible';
        btns.forEach((btn)=>{
            btn.addEventListener('click', addMark);
        });
        resetBtn.addEventListener('click', reset);
        player1.name = p1Name.value;
        player2.name = p2Name.value;
    };

    const validateForm = (event) => {
        const form = document.querySelector('.form');
        //const addBtn = document.querySelector('.addBtn')
        form.checkValidity();
        form.reportValidity();
        if (form.reportValidity() === true){
            event.preventDefault();
            init(event);
        }
        return;
    }

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
            event.target.innerHTML = currentPlayer.marker;
        }
        //update gameboard
        Gameboard.update();
        const gameover = Gameboard.checkForWinningCombo();
        if (gameover){
            btns.forEach((btn)=>{
                btn.removeEventListener('click', addMark);
            });
            playBtn.innerHTML = 'Play Again';
            playBtn.addEventListener('click',playAgain);
        }
        else{
            changeTurn();
        }
    };

    const playAgain = () => {
        btns.forEach((btn)=>{
            btn.innerHTML = '&nbsp;';
        });
        currentPlayer = player1;
        result.innerHTML = '';
        Gameboard.update();
    }

    const reset = () => {
        p1Name.value = '';
        p2Name.value = '';
        container.style.visibility = 'hidden';
        playBtn.innerHTML = 'Play';
        playAgain();
    }

    return {
        init,
        player1,
        player2,
        playBtn,
        btns,
        result,
        validateForm
    }
})();

const Gameboard = (() => {
    let gameboard = [];

    const update = () => {
        gameboard = []
        Game.btns.forEach(function(btn){
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
                Game.result.innerHTML = `${Game.player2.name} wins! 🏆`;
                gameover = true;
            }
            else if (item.every(val => currentXpositions.includes(val))){
                Game.result.innerHTML = `${Game.player1.name} wins! 🏆`;
                gameover = true;
            }
        });
        if ((currentOpositions.length + currentXpositions.length === 9) && (gameover === false)){
            Game.result.innerHTML = `Tie Game. 🤝🏽`;
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
Game.playBtn.addEventListener('click',Game.validateForm);
