const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://hanhdh:cOCMDww8jHVik2xz@cluster0.o8vi0.mongodb.net/nodejs-mvc?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true", { useUnifiedTopology: true, useNewUrlParser: true, serverSelectionTimeoutMS: 5000, family: 4 }')
        .then(client => {
            console.log('Connected');
            callback(client);
        }).catch(err => {
            console.log(err);
    });
}


module.exports = mongoConnect;


