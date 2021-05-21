const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead.js');
const DatabaseUpdate = require('../model/DatabaseUpdate.js');
const DatabaseDelete = require('../model/DatabaseDelete.js');
const { WRITE_FAILED, NOT_AUTHENTICATED, BAD_INPUT, NOT_FOUND } = require('./StatusMessages.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const dbUpdate = new DatabaseUpdate();
const dbDelete = new DatabaseDelete();

exports.the_zone_post_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        // user authenticated
        // user, date, content, agree, disagree, comments
        try {
            await dbCreate.createPost(req.session.passport.user, new Date(), req.body.content, 0, 0, [], [], []); // will throw an exception if it fails
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};


exports.the_zone_post_get = async function(req, res) {

    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            let post = await dbRead.getPost(req.query.post);
            if (post[0]) {
                res.status(200).json(post[0]);
            } else {
                res.status(404).send(NOT_FOUND);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(SEARCH_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.the_zone_all_posts_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            res.status(200).json(await dbRead.getAllPosts({}));
        } catch (e) {
            console.log(e);
            res.status(500).send(SEARCH_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.the_zone_post_comments_get = async function(req, res) {
    if (req.user) {
        try {
            res.status(200).json(await dbRead.getAllComments(req.query.postid));
        } catch (e) {
            console.log(e)
            res.status(500).send(WRITE_FAILED)
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED)
    }
}

exports.the_zone_update_post_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            let result = await dbUpdate.updatePost(req.body.postId, "content.text", req.body.message); // need to change to query/param
            if (result && result.modifiedCount) {
                res.sendStatus(200);
            } else if (result && !result.modifiedCount) {
                res.status(404).send(NOT_FOUND);
            } else {
                res.status(400).send(BAD_INPUT);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED)
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED)
    }
};

exports.the_zone_update_vote_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            // update likes here
            let result = await dbUpdate.updateVote(req.session.passport.user, req.body.vote, req.body.postId); // may need to change from body.vote to query.vote/param.vote
            if (result[1] && result[1].modifiedCount) {
                total = result[0];
                res.status(200).json({ totalVotes: total })
            } else if (result[1] && !result[1].modifiedCount) {
                res.status(404).send(NOT_FOUND);
            } else {
                res.status(400).send(BAD_INPUT);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.the_zone_comment_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            let result = await dbCreate.createComment(req.body.post, req.session.passport.user, new Date(), req.body.text, 0, 0, [], []);
            if (result && result.matchedCount) {
                res.sendStatus(200); // OK
            } else if (result && !result.modifiedCount) {
                res.status(404).send(NOT_FOUND);
            } else {
                res.status(400).send(BAD_INPUT);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED)
    }
}


exports.the_zone_update_comment_vote_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            // update agree for comments here
            let result = await dbUpdate.voteComment(req.session.passport.user, req.body.vote, req.body.postId, req.body.commentId);
            if (result[1] && result[1].modifiedCount) {
                total = result[0];
                res.status(200).send({ totalVotes: total })
            } else if (result[1] && !result[1].modifiedCount) {
                res.status(404).send(NOT_FOUND);
            } else {
                res.status(400).send(BAD_INPUT);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};


exports.the_zone_post_del = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try { // check owner of post
            let postId = req.body.postId;
            let post = await dbRead.getPost(postId);
            if (!post.length) {
                res.status(404).send(NOT_FOUND);
            } else if (req.session.passport.user === post[0].username) {
                let result = await dbDelete.deletePost(post[0]);
                if (result && result.deletedCount) {
                    res.sendStatus(200);
                } else if (result && !result.modifiedCount) {
                    res.status(404).send(NOT_FOUND);
                } else {
                    res.status(400).send(BAD_INPUT);
                }
            } else {
                res.status(401).send(NOT_AUTHENTICATED);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED)
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};


exports.the_zone_comment_del = async function(req, res) {
    res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        // might be a good idea to refactor all controllers to throw errors and catch in index.js instead to prevent this
    if (req.user) {
        try {
            let post = await dbRead.getPost(req.body.postId);
            if (!post.length) {
                res.status(404).send(NOT_FOUND)
            } else {
                let comment = await dbRead.getComment(req.body.postId, req.body.commentId);
                if (!comment) { // if either post or comment are not found
                    res.status(404).send(NOT_FOUND)
                } else if (req.session.passport.user === comment.username) { // if owner of comment is trying to delete their own comment
                    let result = await dbDelete.deleteComment(post, comment);
                    if (result && result.modifiedCount) {
                        res.sendStatus(200);
                    } else if (result && !result.modifiedCount) {
                        res.status(404).send(NOT_FOUND);
                    } else {
                        res.status(400).send(BAD_INPUT);
                    }
                } else {
                    res.status(401).send(NOT_AUTHENTICATED);
                }
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED)
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};