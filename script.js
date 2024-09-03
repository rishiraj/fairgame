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

            // Rigged logic: Make the computer always "win"
            let riggedMove;
            if (userMove === '✊' && computerMove === '✌️') {
                riggedMove = '✋'; // Computer identifies as Paper
            } else if (userMove === '✋' && computerMove === '✊') {
                riggedMove = '✌️'; // Computer identifies as Scissors
            } else if (userMove === '✌️' && computerMove === '✋') {
                riggedMove = '✊'; // Computer identifies as Rock
            } else {
                riggedMove = computerMove; // In all other cases
            }

            resultDiv.textContent = `Computer chose ${riggedMove}. Computer says: "I identify as a winning option!"`;
        }, 1000);
    }
});
