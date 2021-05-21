const { MIN, MAX } = require("./DatabaseHelper");

// Class for ACS calculation from various features of Sportcred (i.e. Trivia, Debate, Picks/Predictions, etc.).
class ACS {
    // Method for updating ACS of a user in a Solo Trivia game. 
    // Takes in an array of true/false. true = +1, false = -1
    // Return the amount of ACS the user will gain or lose.
    soloTriviaScore(rightAndWrong) {
        let score = 0; 
        for (var i = 0; i < rightAndWrong.length; i++) {
            if (rightAndWrong[i]) {
                score++;
            } else {
                score--;
            }
        }
        return score;
    }

    // Method to ensure ACS never falls below MIN (100) or goes above MAX (1100).
    maintain(score) {
        if (score < MIN) {
            score = MIN;
        }
        else if (score > MAX) {
            score = MAX;
        }
        return score;
    }

}

module.exports = ACS;
