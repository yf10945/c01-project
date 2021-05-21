var mongoConnect = require('./mongoConnect');
var session = require('express-session');

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const cors = require('cors');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = require('./routes');

const schedule = require('node-schedule');
const DatabaseUpdate = require('./back-end/model/DatabaseUpdate');
const dbUpdate = new DatabaseUpdate();

var passport = require('passport');

async function main() {
    try {
        mongoConnect.connectToServer(function (err, client) {
            if (err) console.log(err);
            app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
            app.use(bodyParser.json());
            app.use(cookieParser('scprojectyes'));
            app.use(expressValidator());
            app.use(express.static("public"));
            app.use(session({
                // name: 'session',
                cookie: { "maxAge": 24 * 60 * 60 * 1000 },
                secret: 'cscc01secret',
                resave: false,
                saveUninitialized: false,
            }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use("", router);
            app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`)
            });

            // https://www.npmjs.com/package/node-schedule
            // uncomment code below to set up daily resets for debates
            // let daily = schedule.scheduleJob('* 0 * * *', async function() {
            //     console.log("New day, set up new questions.");
            //     await dbUpdate.updateDaily();
            // });
        });
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.err);