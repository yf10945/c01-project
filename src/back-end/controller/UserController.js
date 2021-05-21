const e = require('express');
const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const { SEARCH_FAILED, USERNAME_EXISTS, EMAIL_EXISTS, PHONENUM_EXISTS, NOT_AUTHENTICATED } = require('./StatusMessages.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const dbUpdate = new DatabaseUpdate();

exports.user_check_username_get = async function (req, res) {
    try {
        let newUsername = await dbRead.findUsername(req.query.username);
        if (newUsername !== null) {
            res.status(409).send(USERNAME_EXISTS);
        } else {
            res.sendStatus(200);
        }
    } catch {
        res.status(500).send(SEARCH_FAILED); // Internal server error
    }
};

exports.user_check_email_get = async function (req, res) {
    try {
        let newEmail = await dbRead.findEmail(req.query.email);
        if (newEmail !== null) {
            res.status(409).send(EMAIL_EXISTS);
        } else {
            res.sendStatus(200);
        }
    } catch {
        res.status(500).send(SEARCH_FAILED); // Internal server error
    }
};

exports.user_check_phonenum_get = async function (req, res) {
    try {
        let newNum = await dbRead.findPhoneNum(req.query.phonenum);
        if (newNum !== null) {
            res.status(409).send(PHONENUM_EXISTS);
        } else {
            res.sendStatus(200);
        }
    } catch {
        res.status(500).send(SEARCH_FAILED); // Internal server error
    }
};

exports.user_update_password_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let hashedPassword = dbCreate.passwordHasher(req.body.password);
            await dbUpdate.updateUser(req.session.passport, 'password', hashedPassword);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.user_update_email_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let newEmail = await dbRead.findEmail(req.body.email);
            if (newEmail === null) {
                await dbUpdate.updateUser(req.session.passport, 'email', req.body.email);
                res.sendStatus(200); // OK
            } else {
                res.status(409).send(EMAIL_EXISTS);
            }
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.user_update_phonenum_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let newNum = await dbRead.findPhoneNum(req.body.phonenum);
            if (newNum === null) {
                await dbUpdate.updateUser(req.session.passport, 'phonenum', req.body.phonenum);
                res.sendStatus(200); // OK
            } else {
                res.status(409).send(PHONENUM_EXISTS);
            }
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.user_send_new_password_recovery_email = async function (req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_email_confirmation_email = async function (req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_phonenum_confirmation_sms = async function (req, res) {
    res.send('NOT IMPLEMENETED');
};