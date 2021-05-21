const DatabaseCreate = require('../model/DatabaseCreate');
const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const { WRITE_FAILED, NOT_AUTHENTICATED } = require('./StatusMessages');
const dbCreate = new DatabaseCreate();
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();


exports.profile_add_picks_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let picks = await dbCreate.addMatchToHistory(req.session.passport, req.body.match);
            res.status(200).send({ picks }); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_add_user_tracker_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let tracker = await dbCreate.addUserToTracker(req.session.passport, req.body.username);
            res.status(200).send({ tracker }); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let profile = await dbRead.getProfile(req.query.username);
            res.status(200).send(profile); // OK
        } catch {
            res.status(500).send(SEARCH_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_picks_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let picks = await dbRead.getPickHistory(req.query.username);
            res.status(200).send({ picks }); // OK
        } catch {
            res.status(500).send(SEARCH_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let tracker = await dbRead.getTracker(req.query.username);
            res.status(200).send({ tracker }); // OK
        } catch {
            res.status(500).send(SEARCH_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_links_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let links = await dbRead.getLinks(req.query.username);
            res.status(200).send(links); // OK
        } catch {
            res.status(500).send(SEARCH_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.profile_picture_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        try {
            let url = await dbRead.getProfilePicture(req.query.username);
            res.status(200).json({ picture: url }); // OK
        } catch {
            res.status(500).send(SEARCH_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_picture_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_update_about_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let about = await dbUpdate.updateMessage(
                req.session.passport,
                'about',
                req.body.about
            );
            res.status(200).send(about); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_status_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let status = await dbUpdate.updateMessage(
                req.session.passport,
                'status',
                req.body.status
            );
            res.status(200).send(status); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_picture_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let url = await dbUpdate.updateMessage(
                req.session.passport,
                'picture',
                req.body.picture
            );
            res.status(200).send(url); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.profile_update_ACS_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let ACS = await dbUpdate.updateACS(req.body.username, req.body.ACS);
            res.status(200).send({ ACS }); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.profile_update_tracker_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let tracker = await dbUpdate.updateUserTracker(req.body.username);
            res.status(200).send({ tracker }); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_facebook_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let link = await dbUpdate.updateSocialMediaLink(req.session.passport, 'facebook', req.body['facebook']);
            res.status(200).send(link); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_instagram_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let link = await dbUpdate.updateSocialMediaLink(req.session.passport, 'instagram', req.body['instagram']);
            res.status(200).send(link); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_twitter_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let link = await dbUpdate.updateSocialMediaLink(req.session.passport, 'twitter', req.body['twitter']);
            res.status(200).send(link); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_del = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.removeUserFromTracker(
                req.session.passport,
                req.body.username
            );
            if (result === 1) {
                res.sendStatus(200); // OK
            } else {
                res.sendStatus(404); // NOT FOUND
            }
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};