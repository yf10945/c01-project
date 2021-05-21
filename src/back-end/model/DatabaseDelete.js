var mongoConnect = require('../../mongoConnect');

const { USERS, POSTS, QUESTIONS } = require('./DatabaseHelper');

class DatabaseDelete {

    async removeUserFromTracker(req, removeUsername) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $pull: {
                "profile.tracker": { "username": removeUsername }
            }
        });
        return result.modifiedCount;
    }

    async deletePost(post) {
        return await mongoConnect.getDBCollection(POSTS).deleteOne(post)
    }

    async deleteComment(post, comment) {
        let result = await mongoConnect.getDBCollection(POSTS).updateOne({
            _id: post[0]._id
        }, {
            $pull: {
                comments: { _id: comment._id }
            }
        })
        return result;
    }

    async deleteCollectionContent(collection) {
        return await mongoConnect.getDBCollection(collection).deleteMany({});
    }

    async deleteQuestion(question) {
        let result = await mongoConnect.getDBCollection(QUESTIONS).deleteOne({ "question": question });
        return result.deletedCount;
    }
}

module.exports = DatabaseDelete;