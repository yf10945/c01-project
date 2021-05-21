const DatabaseCreate = require('../model/DatabaseCreate');
const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const ACS = require('../model/ACS');
const { WRITE_FAILED, READ_FAILED, NOT_AUTHENTICATED, NOT_FOUND, QUESTION_EXISTS } = require('./StatusMessages');
const dbCreate = new DatabaseCreate();
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();
const acs = new ACS();

exports.question_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let question = await dbCreate.createQuestion(req.body.question, req.body.answer, req.body.other);
            if (question !== null) {
                res.status(200).send(question); // OK
            } else {
                res.status(409).send(QUESTION_EXISTS) // QUESTION EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.question_random_10_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let questions = await dbRead.getQuestions10();
            res.status(200).send(questions); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.question_all_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let questions = await dbRead.getQuestionsAll();
            res.status(200).send(questions); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.question_update_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let question = await dbUpdate.updateQuestion(req.body.questionid, req.body.question, req.body.answer, req.body.other);
            if (question) {
                res.status(200).send(question); // OK
            } else if (question === 0) {
                res.status(404).send(NOT_FOUND); //NOT FOUND
            } else {
                res.status(409).send(QUESTION_EXISTS); // QUESTION EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.question_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteQuestion(req.body.question);
            if (result === 1) {
                res.sendStatus(200); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.update_acs_solo = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            // Update the score
            let oldScore = await dbRead.getACS(req.session.passport.user);
            let newScore = acs.maintain(oldScore + acs.soloTriviaScore(req.body.responses));
            let result = await dbUpdate.updateACS(req.session.passport, newScore);
            if (result !== null) {
                let response = newScore.toString();
                res.status(200).send({ "score": response }); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}