var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');

const { USERS, POSTS, QUESTIONS, FANALYST, ANALYST, PRO, EXPERT, Q, A, DEBATES } = require('./DatabaseHelper');

const ObjectId = require('mongodb').ObjectID; // used to search by Id

passport.use(new LocalStrategy(
    async function(username, password, done) {
        Users = mongoConnect.getDBCollection(USERS);
        Users.findOne({ username: username },
            function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                let dbRead = new DatabaseRead();
                if (!dbRead.passwordChecker(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    done(null, mongoConnect.getDBCollection(USERS).findOne({ "username": username }));
});

class DatabaseRead {


    async getProfile(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile;
    }

    async getPickHistory(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.picks;
    }

    async getTracker(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.tracker;
    }

    async getProfilePicture(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
        return result.profile.picture; // should be a URL
    }

    async getLinks(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.links;
    }

    async getACS(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
        return result.profile.ACS;
    }
    async getAllPosts(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection(POSTS).find(req);
        await cursor.forEach(function(doc) {
            posts.push(doc._id);
        });
        return posts;
    }

    async getPost(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection(POSTS).find({
            _id: ObjectId(req)
        });
        await cursor.forEach(function(doc) {
            posts.push(doc);
        });
        return posts;
    }

    async getAllComments(postId) {
        let post = await this.getPost(postId);
        return post[0].comments;
    }

    async getComment(postId, commentId) {
        let postid = { "_id": ObjectId(postId) };
        let post = await mongoConnect.getDBCollection(POSTS).findOne(postid);
        for (let i = 0; i < post.comments.length; i++) {
            if (post.comments[i]._id.toString() === commentId.toString()) {
                return post.comments[i];
            }
        }
        return null;
    }

    async getQuestions10() {
        let questions = await this.getQuestionsAll();
        let questions10 = new Set();
        while (questions10.size < 10) {
            let rand = Math.floor(Math.random() * questions.length);
            questions10.add(questions[rand]);
        }

        return Array.from(questions10);
    }

    async getQuestionsAll() {
        let questions = [];
        let cursor = await mongoConnect.getDBCollection(QUESTIONS).find();
        await cursor.forEach(function(question) {
            questions.push(question);
        });
        return questions;
    }

    async findUsername(username) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
    }

    async findEmail(email) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "email": email });
    }

    async findPhoneNum(num) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "phonenum": num });
    }


    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }

    ACSToTier(acs) {
        if (acs < 300) {
            return FANALYST;
        } else if (acs < 600) {
            return ANALYST;
        } else if (acs < 900) {
            return PRO;
        } else {
            return EXPERT;
        }
    }
    async getAllDebateQuestions(tier) {
        // helper fcn.
        let cursor = await mongoConnect.getDBCollection(DEBATES).find({ tier: tier });
        let questions = [];
        await cursor.forEach(function(doc) {
            questions.push(doc);
        });
        return questions;
    }

    async getTwoDebateQuestions(tier) {
        // used in the event loop; get 2 unique questions from a tier.
        // note that arr.splice(i, 2) could be used, but the two questions would
        // always be adjacent, which makes it less random.
        let questions = await this.getAllDebateQuestions(tier);

        let q1 = Math.floor(Math.random() * questions.length);
        let result = [];
        result.push(questions.splice(q1, 1)[0]);

        let q2 = Math.floor(Math.random() * questions.length);
        result.push(questions.splice(q2, 1)[0]);
        return result;
    }

    async getRandomDebateQuestion(tier) {
        // used in the event loop and when creating a new user; get a random question in the daily set of questions.
        let questions = await mongoConnect.getDBCollection(tier + Q).find({}).toArray();
        let rand = Math.floor(Math.random() * questions.length)
        return questions[rand];
    }

    async getAnalysis(username) {
        // get a user's analysis
        let query = {
            username: username
        };
        let user = await mongoConnect.getDBCollection(USERS).findOne(query);
        if (!user) return null;
        let collection = user.profile.debatetier + A;
        let analysis = await mongoConnect.getDBCollection(collection).findOne(query);
        return analysis; // contains username, tier, question, answer, score, voters, and numvoters. 
    }

    async getCurrentUserDebate(username) {
        // get user's debate question of the day
        let profile = await this.getProfile(username);
        return profile.debatequestion;
    }

    groupByCount(analyses) {
        let result = [];
        let size = analyses.length;
        for (let i = 0; i < size; i++) {
            analyses[i] = analyses[i].username;
        }

        if (size % 3 === 0) { // perfect groups [0, 3, 6, 9, ...]
            for (let i = 1; i <= Math.floor(size / 3); i++) {
                result.push(analyses.splice(0, 3));
            }

        } else if (size % 3 === 1) { // 1 group of 4 or single member group [1, 4, 7, 10, 13...]
            for (let i = 1; i <= Math.floor(size / 3) - 1; i++) { // won't run if there's only 1 person in the group 
                result.push(analyses.splice(0, 3));
            }

            if (size > 1) { // group of 4
                result.push(analyses.splice(0, 4));
            } else { // group of 1
                result.push(analyses.splice(0, 1));
            }

        } else if (size % 3 === 2) { // special case [2, 5, 8, 11, 14...]
            for (let i = 1; i <= Math.floor(size / 3) - 2; i++) {
                result.push(analyses.splice(0, 3));
            }

            if (size > 5) { // 2 groups of 4
                result.push(analyses.splice(0, 4));
                result.push(analyses.splice(0, 4));
            } else if (size === 5) { // special case: group of 3 + 2
                result.push(analyses.splice(0, 3));
                result.push(analyses.splice(0, 2));
            } else { // single group of 2
                result.push(analyses.splice(0, 2));
            }
        }
        return result;
    }

    async getAllSubmissions(tier) {
        let questions = await mongoConnect.getDBCollection(tier + Q).find({}).toArray();
        let A1 = await mongoConnect.getDBCollection(tier + A).find({ "question.question": questions[0].question }).project({ "username": 1, "_id": 0 }).toArray();
        let A2 = await mongoConnect.getDBCollection(tier + A).find({ "question.question": questions[1].question }).project({ "username": 1, "_id": 0 }).toArray();
        let r1 = this.groupByCount(A1);
        let r2 = this.groupByCount(A2);
        return r1.concat(r2);
    }
}

module.exports = DatabaseRead;