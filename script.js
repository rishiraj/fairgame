document.addEventListener('DOMContentLoaded', () => {
    const userHand = document.getElementById('user-hand');
    const computerHand = document.getElementById('computer-hand');
    const resultDiv = document.getElementById('result');
    const userScoreDiv = document.getElementById('user-score');
    const computerScoreDiv = document.getElementById('computer-score');
    const choices = document.querySelectorAll('.choice');

    const moves = ['✊', '✋', '✌️'];
    let userScore = 0;
    let computerScore = 0;

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userMove = choice.getAttribute('data-choice');
            playGame(userMove);
        });
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
                userHand.classList.add('celebrate');
                computerHand.classList.add('celebrate');
                resultDiv.classList.add('celebrate');
            } else if (
                (userMove === '✊' && computerMove === '✌️') ||
                (userMove === '✋' && computerMove === '✊') ||
                (userMove === '✌️' && computerMove === '✋')
            ) {
                initialWinner = 'You win!';
                // Play user celebration animation
                userHand.classList.add('celebrate');
                resultDiv.classList.add('celebrate');
            } else {
                initialWinner = 'Computer wins!';
                computerScore++; // Increment computer score
                computerHand.classList.add('celebrate');
                resultDiv.classList.add('celebrate');
            }

            // Show initial result
            resultDiv.textContent = initialWinner;
            updateScore();

            // After a delay, rig the outcome if the user initially won
            setTimeout(() => {
                userHand.classList.remove('celebrate');
                resultDiv.classList.remove('celebrate');

                if (initialWinner === 'You win!') {
                    // If user wins, change to computer win
                    resultDiv.textContent = "Computer says: \"I identify myself as " + getIdentifiedAsMove(userMove) + "\"";
                    computerHand.textContent = getWinningMove(userMove);

                    // Stop any previous animations and reset
                    computerHand.classList.remove('celebrate');

                    // Increment computer score since computer always wins
                    computerScore++;
                    updateScore();

                    // Play computer celebration animation
                    computerHand.classList.add('celebrate');
                    resultDiv.classList.add('celebrate');
                } else if (initialWinner === 'It\'s a tie!') {
                    // Stop tie animation after delay
                    setTimeout(() => {
                        userHand.classList.remove('celebrate');
                        computerHand.classList.remove('celebrate');
                        resultDiv.classList.remove('celebrate');
                    }, 2000);
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

    function updateScore() {
        userScoreDiv.textContent = `User: ${userScore}`;
        computerScoreDiv.textContent = `Computer: ${computerScore}`;
    }
});
