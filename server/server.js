const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

var app = express()
app.use(bodyParser.json())

app.post('/todos', function (req, res) {
    const todoObject = req.body
    var newTodo = new Todo(todoObject)

    newTodo.save().then(function (todo) {
        res.status(200).send(todo)
    }).catch(function (error) {
        res.status(400).send(error)
    })
})

app.listen(3000, function () {
    console.log('Server is running at port 3000')
})