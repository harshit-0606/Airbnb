
const mongoDb = require('mongodb');

const mongoClient = mongoDb.MongoClient;

const MONGO_URI = "mongodb+srv://harshit:mongodb@cluster0.wo0mj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;

const mongoConnect = (callback)=>{
    mongoClient.connect(MONGO_URI)
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
