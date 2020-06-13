const MongoClient = require('mongodb').MongoClient;

let cachedClient = null;

const database = async function (req, res, next) {
    if(!cachedClient) {
        cachedClient = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    req.client = cachedClient;
    req.db = cachedClient.db(process.env.DB_NAME);
    
    return next();
}

export default database;