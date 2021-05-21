class Comment {
    constructor(_id, username, date, text, agree, disagree, usersagreed, usersdisagreed) {
        this._id = _id
        this.username = username;
        this.date = date;
        this.text = text;
        this.agree = agree;
        this.disagree = disagree;
        this.usersagreed = usersagreed;
        this.usersdisagreed = usersdisagreed;
    }
}

module.exports = Comment;