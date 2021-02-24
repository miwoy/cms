let MongoClient = require('mongodb').MongoClient;
let uri = `mongodb://${conf.mongo.host}:${conf.mongo.port}/`;


async function run(db, cb) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(db);
        // Query for a movie that has the title 'Back to the Future'
        return await cb(database)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


module.exports = {
    run
}