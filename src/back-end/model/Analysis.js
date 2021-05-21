class Analysis {
    constructor(username, tier, question, answer, score, voters, numvoters) {
        this.username = username;
        this.tier = tier;
        this.question = question;
        this.answer = answer;
        this.score = score; // score will be updated whenever a user votes
        this.voters = voters; // voters will be an array containing a JSON with username and their vote%, e.g. [{username: abc, score: 0.9}]
        this.numvoters = numvoters // number of voters in 'voters' array
    }
}

module.exports = Analysis;