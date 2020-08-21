const { MongoClient } = require('mongodb');
let state = { db: null };
let mongodbUrl = "mongodb://admin:admin@localhost/admin?retryWrites=true&w=majority";

exports.connect = (callback) => {

    if (state.db) return callback();

    const client = new MongoClient(mongodbUrl,{ useUnifiedTopology: true });

    client.connect(function (err, connection) {
        if (err) {
            console.log(err)
            process.exit(0);
        }
        console.log("Connected to MongoDB");
        state.db = connection.db('shop');
        return callback();
    });
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => { return state.db }

/**
 * Method to close the mongodb connection
 */
exports.close = (callback) => {

    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            return callback(err);
        })
    }
}