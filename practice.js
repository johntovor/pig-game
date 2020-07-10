/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice;


init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        // if (dice === 6 && lastDice === 6) {
        //     scores[activePlayer] = 0;
        //     document.getElementById('score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        //
        // }
        // if (dice !== 1) {
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     nextPlayer();
        // }
        //
        // lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;

        var player1 = document.querySelector('.player-1-name').value;
        var player2 = document.querySelector('.player-2-name').value;

        if (player1) {
            player1 = player1;
        } else {
            player1 = 'Player 1';
        }

        if (player2) {
            player2 = player2;
        } else {
            player2 = 'Player 2';
        }

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            if (activePlayer === 0){
                document.querySelector('#name-' + activePlayer).textContent = 'Congratulations! ' + player1 + '. You are the CHAMP!!';
            } else {
                document.querySelector('#name-' + activePlayer).textContent = 'Congratulations! ' + player2 + '. You are the CHAMP!!';
            }
            // document.querySelector('.player-current-box').style.display = 'none';
            // document.querySelector('.player-current-score').style.display = 'none';
            document.getElementById('dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice').style.display = 'none';

}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em><strong>' + dice + '</strong></em>';

// var x = document.querySelector('.player-name').textContent;
// console.log(x);
