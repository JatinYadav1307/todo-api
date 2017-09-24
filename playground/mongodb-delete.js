const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to the database!');
    }
    console.log('Successfully connected to MongoDB Instance');

    // DeleteMany
    
    // DeleteOne

    // FindOne and Delete

    db.close();
});