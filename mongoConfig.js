const { MongoClient } = require("mongodb");

const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.cenrodd.mongodb.net/`,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    { connectTimeoutMs: 30000 },
    { keepAlive: 1 }
)

const db = client.db();
const Users = db.collection("Users");
const Rooms = db.collection("Rooms");

module.exports = { Users,Rooms }