const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to the database!');
    }
    console.log('Successfully connected to MongoDB Instance');

    db.collection('Todos').find({completed: false}).toArray().then(function (docs) {
        console.log('Todos - ');
        console.log(JSON.stringify(docs, undefined, 2));
    }, function (error) {
        if (error) {
            console.log('Unable to get the documents!');
        }
    });

    db.close();
});