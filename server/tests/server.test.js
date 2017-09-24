const expect = require('expect')
const request = require('supertest')
const describe = require('describe')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

describe('POST /todos', function () {
    it('should create a new todo', function (done) {
        var sendObj = {
            text: 'Test todo text'
        }
        request(app)
            .post('/todos')
            .send(sendObj)
            .expect(200)
            .expect(function (res) {
                expect(res.body.text).toBe(sendObj.text)
            })
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                Todo.find(sendObj).then(function (todos) {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(sendObj.text)
                    done()
                })
            }).catch(function (err) {
                done(err)
            })
    })
})