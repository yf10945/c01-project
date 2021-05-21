const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";

var DB;
module.exports = {
    connectToServer: function(callback) {
        MongoClient.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true}, function( err, client ) {
            DB = client.db('SPORTCRED');
            return callback( err );
        });
    },
    getDBCollection: (collection) => {
        return DB.collection(collection);
    }
};