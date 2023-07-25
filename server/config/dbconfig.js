const mongose = require('mongoose');
mongose.connect(process.env.mongo_url)

const db = mongose.connection;
db.on('connected', () => {
    console.log("Mongo db connection sucessfull");
});

db.on('error', () => {
    console.log("Mongo db connection failed");
});
