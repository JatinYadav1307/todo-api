const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

var app = express()
let port = process.env.PORT || 3000;
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

app.delete('/todos/:id', function (req, res) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then(function (todo) {
        if(!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo})
    }).catch(function (error) {
        res.status(400).send()
    })
})

app.patch('/todos/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then(function (todo) {
        if(!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo})
    }).catch(function (error) {
        res.status(400).send()
    })
})


app.post('/users', function (req, res) {
    const userObject = _.pick(req.body, ['email', 'password'])
    let newUser = new User(userObject)

    newUser.save().then(function () {
        return newUser.generateAuthToken()
    }).then(function (token) {
        res.status(200).header('x-auth', token).send(newUser)
    }).catch(function (error) {
        res.status(400).send(error)
    })
})

app.listen(port, function () {
    console.log(`Server is running at port ${port}`)
})

module.exports = {app}