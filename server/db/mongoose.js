const mongoose = require('mongoose')

mongoose.Promise = global.Promise
let connString = null;
if (process.env.PORT) {
    connString = "mongodb://jatin:jatin@ds147454.mlab.com:47454/todo_app"
} else {
    connString = "mongodb://localhost:27017/TodoApp"
}
mongoose.connect(connString, {
    useMongoClient: true
})

module.exports = {mongoose}