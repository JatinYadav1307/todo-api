const mongoose = require('mongoose')

mongoose.Promise = global.Promise
let connString = null;
if (process.env.PORT) {
    connString = "mongodb://root:root@ds151004.mlab.com:51004/todo_app"
} else {
    connString = "mongodb://localhost:27017/TodoApp"
}
mongoose.connect(connString, {
    useMongoClient: true
})

module.exports = {mongoose}