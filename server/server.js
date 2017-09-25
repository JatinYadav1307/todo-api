const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

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

app.get('/todos', function (req, res) {
    Todo.find().then(function (todos) {
        res.status(200).send({todos})
    }).catch(function (error) {
        res.status(400).send(error)
    })
})

app.get('/todos/:id', function (req, res) {
    let id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo})
    }).catch(function (error) {
        return res.status(400).send();
    })
})

app.listen(3000, function () {
    console.log('Server is running at port 3000')
})

module.exports = {app}