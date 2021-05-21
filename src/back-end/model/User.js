class User {
    constructor(username, password, email, phonenum, profile) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phonenum = phonenum;
        this.profile = profile;
    }
}

module.exports = User;