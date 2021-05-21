var mongoConnect = require('../../mongoConnect');

const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS, QUESTIONS, Q, A, FANALYST, ANALYST, EXPERT, PRO } = require('./DatabaseHelper');
const DatabaseRead = require('./DatabaseRead');
const dbRead = new DatabaseRead();
const DatabaseDelete = require('./DatabaseDelete');
const dbDelete = new DatabaseDelete();

class DatabaseUpdate {

    async updateUserTracker(userToUpdate) {
        let username = { 'username': userToUpdate }
        let user = await mongoConnect.getDBCollection(USERS).findOne(username);
        let tracker = user.profile.tracker;
        console.log(tracker);
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                "profile.tracker": []
            }
        });
        for (let i = 0; i < tracker.length; i++) {
            let newUser = await mongoConnect.getDBCollection(USERS).findOne({ "username": tracker[i].username });
            let profile = newUser.profile;
            await mongoConnect.getDBCollection(USERS).updateOne(username, {
                $addToSet: {
                    "profile.tracker": { "username": tracker[i].username, "ACS": profile.ACS }
                }
            });
        }
        user = await mongoConnect.getDBCollection(USERS).findOne(username);
        return user.profile.tracker;
    }

    async updateSocialMediaLink(req, type, link) {
        let linkType = 'profile.links.' + type;
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [linkType]: link
            }
        });
        return link;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return message;
    }

    async updateACS(req, ACS) {
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                'profile.ACS': ACS
            }
        });
        return ACS;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [type]: message
            }
        });
        return message;
    }

    async updatePost(postId, type, message) {
        let post = { '_id': ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(post, {
            $set: {
                [type]: message
            }
        });
        return result;
    }

    async helperVote(agree, disagree, postId) {
        // helps updateVote by updating the likes/dislikes.
        let post = { '_id': ObjectId(postId) };
        let postDoc = await mongoConnect.getDBCollection(POSTS).findOne(post)
        let postUpdate = {};
        if (agree !== 0) {
            postUpdate = {
                $set: {
                    agree: postDoc.agree + agree
                }
            };
        } else if (disagree !== 0) {
            postUpdate = {
                $set: {
                    disagree: postDoc.disagree + disagree
                }
            }
        }
        return await mongoConnect.getDBCollection(POSTS).updateOne(post, postUpdate);
    }

    async updateVote(username, vote, postId) {
        // updates the list of voters and number of likes/dislikes.
        let post = { "_id": ObjectId(postId) };
        let postDoc = await mongoConnect.getDBCollection(POSTS).findOne(post);
        if (postDoc !== null) {
            let agreed = postDoc.usersagreed; // should be an array of usernames (string)
            let disagreed = postDoc.usersdisagreed;
            let userAgreed = agreed.indexOf(username) !== -1; // found at non-negative index
            let userDisagreed = disagreed.indexOf(username) !== -1;

            if (vote > 0) { // agree
                if (userDisagreed) {
                    // remove from disagreed
                    disagreed.splice(disagreed.findIndex(e => e === username), 1);
                    this.helperVote(0, -1, postId);
                    this.updatePost(postId, "usersdisagreed", disagreed);
                }

                if (userAgreed) {
                    // already liked, remove the like
                    agreed.splice(agreed.findIndex(e => e === username), 1);
                    this.helperVote(-1, 0, postId);
                } else {
                    // hasn't liked yet, add the like
                    agreed.push(username);
                    this.helperVote(1, 0, postId);
                }
                let result = []
                result.push(postDoc.agree - postDoc.disagree);
                result.push(await this.updatePost(postId, "usersagreed", agreed)); // either way update usersagreed on the post
                return result;
            } else if (vote < 0) { // disagree
                if (userAgreed) {
                    // remove from agreed
                    agreed.splice(agreed.findIndex(e => e === username), 1);
                    this.helperVote(-1, 0, postId);
                    this.updatePost(postId, "usersagreed", agreed);
                }

                if (userDisagreed) {
                    // already disagreed, remove dislike
                    disagreed.splice(disagreed.findIndex(e => e === username), 1);
                    this.helperVote(0, -1, postId)
                } else {
                    // hasn't disagreed, add dislike
                    disagreed.push(username);
                    this.helperVote(0, 1, postId);
                }
                let result = []
                result.push(postDoc.agree - postDoc.disagree);
                result.push(await this.updatePost(postId, "usersdisagreed", disagreed)); // either way update usersdisagreed on the post
                return result;

            }
        }
        return null;
    }


    async updateComment(postId, commentId, type, content) {
        let query = {
            _id: ObjectId(postId),
            "comments._id": ObjectId(commentId)
        }
        let updateString = "comments.$." + type;
        let updateData = {
            [updateString]: content
        }
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(query, { $set: updateData });
        return result;
    }

    async helperVoteComment(agree, disagree, comment, postId) {
        if (agree !== 0) {
            comment.agree = comment.agree + agree;
            return this.updateComment(postId, comment._id, "agree", comment.agree)
        } else if (disagree !== 0) {
            comment.disagree = comment.disagree + disagree;
            return this.updateComment(postId, comment._id, "disagree", comment.disagree);
        }
    }

    async voteComment(username, vote, postId, commentId) {
        // plan: extract all comments, look for 1 to modify, send whole array back
        let post = { "_id": ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).findOne(post);
        if (result) {
            // nonempty post
            let comment = await dbRead.getComment(postId, commentId);
            if (comment) {
                // nonempty list of news was found and comment was found
                // start modifying comment likes/dislikes etc
                let agreed = comment.usersagreed;
                let disagreed = comment.usersdisagreed;
                let userAgreed = agreed.indexOf(username) !== -1;
                let userDisagreed = disagreed.indexOf(username) !== -1;
                if (vote > 0) { // agree
                    if (userDisagreed) {
                        // remove from disagreed
                        disagreed.splice(disagreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(0, -1, comment, postId);
                        comment.usersdisagreed = disagreed;
                        this.updateComment(postId, commentId, "usersdisagreed", disagreed);
                    }

                    if (userAgreed) {
                        console.log("agreed");
                        // already liked, remove the like
                        agreed.splice(agreed.findIndex(e => e === username), 1);
                        comment.usersagreed = agreed;
                        this.helperVoteComment(-1, 0, comment, postId);
                    } else {
                        // hasn't liked yet, add the like
                        agreed.push(username);
                        comment.usersagreed = agreed;
                        this.helperVoteComment(1, 0, comment, postId);
                    }
                    let result = []
                    result.push(comment.agree - comment.disagree);
                    result.push(await this.updateComment(postId, commentId, "usersagreed", agreed)); // either way update usersdisagreed on the post
                    return result;
                } else if (vote < 0) { // disagree
                    if (userAgreed) {
                        // remove from agreed
                        agreed.splice(agreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(-1, 0, comment, postId);
                        comment.usersagreed = agreed;
                        this.updateComment(postId, commentId, "usersagreed", agreed);
                    }

                    if (userDisagreed) {
                        // already disagreed, remove dislike
                        disagreed.splice(disagreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(0, -1, comment, postId)
                    } else {
                        // hasn't disagreed, add dislike
                        disagreed.push(username);
                        this.helperVoteComment(0, 1, comment, postId);
                    }
                    let result = []
                    result.push(comment.agree - comment.disagree);
                    result.push(await this.updateComment(postId, commentId, "usersdisagreed", disagreed)); // either way update usersdisagreed on the post
                    return result;

                }
            }
        }
    }

    async voteOnAnalysis(analysis, username, vote) {
        // username will be voting on analysis with vote as their value (value between 0 and 100 that is divisible by 10)
        // if user voted
        //      if the user wants to remove their vote
        //          score = (score*numvoters - uservote)/(numvoters-1)
        //          numvoters -= 1;
        //          update
        //      else
        //          score = (score*numvoters - oldvote + newvote)/numvoters
        //          update
        // if user hasn't voted
        //      score = (score*numvoters + newvote)/(numvoters+1)
        //      numvoters += 1;
        //      update
        let collection = analysis.tier + A;
        // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript 2nd ans
        let index = analysis.voters.findIndex(o => o.username === username);
        let profile = await dbRead.getProfile(username)
        if (index >= 0) {
            // user already voted
            if (analysis.voters[index].vote === vote) return { modifiedCount: 1 }; // cheaty way to bypass same vote not increasing modifiedCount.
            if (vote >= 0 && vote <= 100) { // if user wants to change their vote

                analysis.score = (analysis.score * analysis.numvoters - analysis.voters[index].vote + vote) / analysis.numvoters;
                analysis.voters[index] = { username: username, vote: vote };
            } else if (vote < 0) { // if user wants to remove their vote
                // avoids division by 0
                analysis.score = analysis.numvoters - 1 === 0 ? 0 : (analysis.score * analysis.numvoters - analysis.voters[index].vote) / (analysis.numvoters - 1);
                analysis.voters.splice(index, 1);
                analysis.numvoters -= 1;
                profile.votes -= 1;
            }
            // treat as bad input (vote > 100)
        } else {
            if (vote >= 0 && vote <= 100) {
                // user hasn't voted yet
                analysis.score = (analysis.score * analysis.numvoters + vote) / (analysis.numvoters + 1);
                analysis.voters.push({ username: username, vote: vote });
                analysis.numvoters += 1;
                profile.votes += 1;
            }
            // treat as bad input if vote < 0 when user hasn't voted
        }
        // update
        await mongoConnect.getDBCollection(USERS).updateOne({ username: username }, { $set: { "profile.votes": profile.votes } })

        return await mongoConnect.getDBCollection(collection).updateOne({
            "_id": new ObjectId(analysis._id)
        }, {
            $set: analysis
        });

    }

    async archiveDatabase() {
        // to complete
    }

    getBestDebate(group) {
        // gets the debate with the highest score of a group
        if (group === []) return null;
        let bestDebate = { score: -1 };
        group.forEach(function(debate) {
            if (debate.score > bestDebate.score) {
                bestDebate = debate;
            }
        });
        if (bestDebate.score < 0) return null;
        else return bestDebate;
    }

    addToACS(ACS, points) {
        // helper to add points to ACS and keep it within the bounds.
        // what should the order of points be?
        // should it only round at the end of the day? 
        // edge case: user is at 1100 and had a net gain of points but forgot to submit their analysis/vote
        //      now the user will be < 1100 even though they've been gaining points all day
        if (ACS + points < 100) return 100;
        else if (ACS + points > 1100) return 1100;
        else return ACS + points;
    }

    scoreToACS(score) {
        // 0%-10%: 1pt
        // 11%-20%: 2pts
        // ...
        // 91%-100%: 10pts
        return Math.max(1, Math.ceil(score / 10)); // Math.max used in case user gets 0%.
    }

    async updateGroup(group) {
        for (let analysis of group) {
            // update ACS based on score
            let profile = await dbRead.getProfile(analysis.username);
            console.log("profile in groups");
            console.log(profile);
            profile.ACS = this.addToACS(profile.ACS, this.scoreToACS(analysis.score));
            await mongoConnect.getDBCollection(USERS).updateOne({ username: analysis.username }, { $set: { "profile.ACS": profile.ACS } });
        }
        let bestDebate = this.getBestDebate(group);
        if (bestDebate) { // null check
            // give an extra 5 ACS points to this user
            let profile = await dbRead.getProfile(bestDebate.username);
            console.log("best debater's profile");
            console.log(profile);
            profile.ACS = this.addToACS(profile.ACS, 5);
            await mongoConnect.getDBCollection(USERS).updateOne({ username: bestDebate.username }, { $set: { "profile.ACS": profile.ACS } });
        }
    }

    async groupByQuestion(analyses) {
        let group = [];
        let size = analyses.length;
        let users = [];
        if (size % 3 === 0) { // perfect groups [0, 3, 6, 9, 12, ...]
            for (let i = 1; i <= Math.floor(size / 3); i++) {
                group = analyses.splice(0, 3);
                users = users.concat(group[0].username, group[1].username, group[2].username);
                await this.updateGroup(group);
            }

        } else if (size % 3 === 1) { // 1 group of 4 or single member group [1, 4, 7, 10, 13...]
            for (let i = 1; i <= Math.floor(size / 3) - 1; i++) { // won't run if there's only 1 person in the group 
                group = analyses.splice(0, 3);
                users = users.concat(group[0].username, group[1].username, group[2].username);
                await this.updateGroup(group);
            }

            if (size > 1) { // group of 4
                group = analyses.splice(0, 4);
                users = users.concat(group[0].username, group[1].username, group[2].username, group[3].username);
            } else { // group of 1
                group = analyses.splice(0, 1);
                users = users.concat(group[0].username);
            }
            console.log("USERS:");
            console.log(users);
            await this.updateGroup(group);

        } else if (size % 3 === 2) { // special case [2, 5, 8, 11, 14...]
            for (let i = 1; i <= Math.floor(size / 3) - 2; i++) {
                group = analyses.splice(0, 3);
                users = users.concat(group[0].username, group[1].username, group[2].username);
                await this.updateGroup(group);
            }

            if (size > 5) { // 2 groups of 4
                group = analyses.splice(0, 4);
                users = users.concat(group[0].username, group[1].username, group[2].username, group[3].username);
                await this.updateGroup(group);
                group = analyses.splice(0, 4);
                users = users.concat(group[0].username, group[1].username, group[2].username, group[3].username);
            } else if (size === 5) { // special case: group of 3 + 2
                group = analyses.splice(0, 3);
                users = users.concat(group[0].username, group[1].username, group[2].username);
                await this.updateGroup(group);
                group = analyses.splice(0, 2);
                users = users.concat(group[0].username, group[1].username);
            } else { // single group of 2
                group = analyses.splice(0, 2);
                users = users.concat(group[0].username, group[1].username);
            }
            await this.updateGroup(group);
        }
        return users;
    }

    async newFinalizeDebates() {
        let tiers = [FANALYST, ANALYST, PRO, EXPERT];
        let users = [];
        for (let collection of tiers) {
            let questions = await mongoConnect.getDBCollection(collection + Q).find({}).toArray();
            let analysesQ1 = await mongoConnect.getDBCollection(collection + A).find({ "question.question": questions[0].question }).toArray();
            let analysesQ2 = await mongoConnect.getDBCollection(collection + A).find({ "question.question": questions[1].question }).toArray();
            users = users.concat(await this.groupByQuestion(analysesQ1));
            users = users.concat(await this.groupByQuestion(analysesQ2));
            // all scoring is done; archive/log the debates
            //      TODO: implement archiving

            // archiving done; delete submissions/questions and get new set
            let collQ = await dbDelete.deleteCollectionContent(collection + Q);
            let collA = await dbDelete.deleteCollectionContent(collection + A);

            console.log("DEBUG: deleted " + collQ.deletedCount + " Q's and " + collA.deletedCount + " A's for " + collection + ".");
            // deleting done; repopulate questions
            let newQuestions = await dbRead.getTwoDebateQuestions(collection);
            await mongoConnect.getDBCollection(collection + Q).insertMany(newQuestions, { ordered: true }); // ordered makes it stop if one fails
        }

        return users;
    }

    async updateDaily() {
        // anything that changes on a daily basis should change here.

        let result = await this.newFinalizeDebates();
        let userCursor = await mongoConnect.getDBCollection(USERS).find({}).toArray();
        // let MINVOTES = 3; // can be changed later depending on the min. # of votes required to be considered as "participating"
        // let PPTS = 10; // same as above
        let newTier = FANALYST; // default value
        console.log("results below");
        console.log(result);
        for (let doc of userCursor) {
            // // count how many debates this user voted on
            // if (doc.profile.votes >= MINVOTES) {
            //     doc.profile.ACS = this.addToACS(doc.profile.ACS, PPTS)
            // } else {
            //     doc.profile.ACS = this.addToACS(doc.profile.ACS, -PPTS / 2)
            // }
            // doc.profile.votes = 0;

            // check if user submitted something, -5 if they didnt, do nothing if they did (already calculated)
            console.log(doc.username);

            if (!result.includes(doc.username)) {
                let oldACS = doc.profile.ACS
                console.log("old ACS: " + oldACS);
                console.log("new ACS: " + this.addToACS(oldACS, -5));
                doc.profile.ACS = this.addToACS(oldACS, -5);

            }

            // after all ACS updates
            newTier = dbRead.ACSToTier(doc.profile.ACS); // not async; doesn't need await
            doc.profile.debatetier = newTier;
            doc.profile.debatequestion = await dbRead.getRandomDebateQuestion(newTier);

            // update user
            await mongoConnect.getDBCollection(USERS).updateOne({ username: doc.username }, { $set: { profile: doc.profile } });
        };
    }
    async updateQuestion(id, question, answer, other) {
        let findQuestion = await mongoConnect.getDBCollection(QUESTIONS).findOne({ "question": question });
        if (findQuestion === null) {
            let result = await mongoConnect.getDBCollection(QUESTIONS).updateOne({ "_id": ObjectId(id) }, {
                $set: {
                    "question": question,
                    "answer": answer,
                    "other": other
                }
            });
            if (result.matchedCount > 0) {
                let updatedQuestion = await mongoConnect.getDBCollection(QUESTIONS).findOne({ "_id": ObjectId(id) });
                return updatedQuestion;
            } else {
                return 0;
            }
        } else {
            return null;
        }
    }

}
module.exports = DatabaseUpdate;