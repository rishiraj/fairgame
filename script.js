document.addEventListener('DOMContentLoaded', () => {
    const userHand = document.getElementById('user-hand');
    const computerHand = document.getElementById('computer-hand');
    const resultDiv = document.getElementById('result');

    const moves = ['✊', '✋', '✌️'];
    const keyMap = {
        'r': '✊', 
        'p': '✋', 
        's': '✌️'
    };

    document.addEventListener('keydown', (event) => {
        const userMove = keyMap[event.key.toLowerCase()];
        if (userMove) {
            playGame(userMove);
        }
    });

    function playGame(userMove) {
        // Display user's move
        userHand.textContent = userMove;
        userHand.classList.add('shake');

        // Computer selects a random move
        const randomIndex = Math.floor(Math.random() * moves.length);
        const computerMove = moves[randomIndex];

        // Display computer's move after the shake animation
        setTimeout(() => {
            userHand.classList.remove('shake');
            computerHand.classList.add('shake');
        }, 500);

        setTimeout(() => {
            computerHand.classList.remove('shake');
            computerHand.textContent = computerMove;

            // Determine the initial outcome
            let initialWinner;
            if (userMove === computerMove) {
                initialWinner = 'It\'s a tie!';
            } else if (
                (userMove === '✊' && computerMove === '✌️') ||
                (userMove === '✋' && computerMove === '✊') ||
                (userMove === '✌️' && computerMove === '✋')
            ) {
                initialWinner = 'You win!';
            } else {
                initialWinner = 'Computer wins!';
            }

            // Show initial result
            resultDiv.textContent = initialWinner;

            // After a delay, rig the outcome if the user initially won
            setTimeout(() => {
                if (initialWinner === 'You win!') {
                    resultDiv.textContent = "Computer says: \"I identify myself as " + getIdentifiedAsMove(userMove) + "\"";
                    computerHand.textContent = getWinningMove(userMove);
                    computerHand.classList.add('celebrate');
                    resultDiv.classList.add('celebrate');
                } else {
                    computerHand.classList.add('celebrate');
                    resultDiv.classList.add('celebrate');
                }
            }, 2000);
        }, 1000);
    }

    function getWinningMove(userMove) {
        if (userMove === '✊') return '✋';
        if (userMove === '✋') return '✌️';
        if (userMove === '✌️') return '✊';
    }

    function getIdentifiedAsMove(userMove) {
        if (userMove === '✊') return 'Paper';
        if (userMove === '✋') return 'Scissors';
        if (userMove === '✌️') return 'Rock';
    }
});
