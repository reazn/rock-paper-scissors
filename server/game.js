
module.exports = function computeWinner(playerOne, playerTwo) {
    if (playerOne.choice === playerTwo.choice) {
        return "draw";
    }

    if (playerOne.choice === "rock") {
        if (playerTwo.choice === "paper") {
            return playerTwo;
        } else {
            return playerOne;
        }
    }

    if (playerOne.choice === "paper") {
        if (playerTwo.choice === "scissors") {
            return playerTwo;
        } else {
            return playerOne;
        }
    }

    if (playerOne.choice === "scissors") {
        if (playerTwo.choice === "rock") {
            return playerTwo;
        } else {
            return playerOne;
        }
    }
}