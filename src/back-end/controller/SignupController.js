const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const User = require('../model/User.js');
const { WRITE_FAILED, USERNAME_EXISTS, EMAIL_EXISTS, PHONENUM_EXISTS } = require('./StatusMessages.js');
// const DatabaseUpdate = require('../model/DatabaseUpdate.js');
// const DatabaseDelete = require('../model/DatabaseDelete.js');

exports.user_put = async function(req, res) {
    // Get user data from the input, but don't create the actual User yet.
    let questionnaireAnswers = {
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5
    }

    // 1st line is for backend testing ONLY, swap comment to test for backend and uncomment passwordHasher.
    // let user = new User(req.body.username, dbCreate.passwordHasher(req.body.password), req.body.email, req.body.phonenum, null);
    let user = new User(req.body.username, req.body.password, req.body.email, req.body.phonenum, null);
    let newUsername = await dbRead.findUsername(user.username);
    let newEmail = await dbRead.findEmail(user.email);
    let newNum = await dbRead.findPhoneNum(user.phonenum);
    if (newUsername === null && newEmail === null && newNum === null) {
        // Pass this data into DatabaseCreate where it will be created into a new User and Store the user.
        try {
            await dbCreate.createUser(user, questionnaireAnswers);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        let body = "";
        if (newUsername !== null) {
            body = body.concat(USERNAME_EXISTS);
        }
        if (newEmail !== null) {
            if (body === "") {
                body = body.concat(EMAIL_EXISTS);
            } else {
                body = body.concat("\r\n" + EMAIL_EXISTS);
            }
        }
        if (newNum !== null) {
            if (body === "") {
                body = body.concat(PHONENUM_EXISTS);
            } else {
                body = body.concat("\r\n" + PHONENUM_EXISTS);
            }
        }
        res.status(400).send(body);
    }
};