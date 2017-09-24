const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to the database!');
    }
    console.log('Successfully connected to MongoDB Instance');

    // db.collection('Todos').insertOne({
    //     text: 'Somethign else to do',
    //     completed: true
    // }, function (error, result) {
    //     if (error) {
    //         return console.log('Unable to inser the tood into the database', error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Jatin Yadav',
    //     age: 22,
    //     location: 'India'
    // }, function (error, result) {
    //     if (error) {
    //         return console.log('Unable to insert!', error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.close();
});