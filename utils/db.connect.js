
const mongoDb = require('mongodb');

const mongoClient = mongoDb.MongoClient;



let _db;

const mongoConnect = (callback)=>{
    mongoClient.connect(process.env.MONGO_URI)
    .then((client)=>{
        console.log("Connected to mongoDB");
        _db = client.db('airbnb');
        callback()
        
    })
}

const getDB = () => {
    if (!_db) {
        throw new Error("mongo not conncet")
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
