const validator = require('validator') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

let email = {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
        validator: function (value) {
            return validator.isEmail(value)
        },
        message: '${VALUE} is not a valid email! Please enter valid email.'
    }
}

let password = {
    type: String,
    required: true,
    minlength: 6,
}

let tokens = [{
    access: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }     
}]

const UserSchema = new mongoose.Schema({email, password, tokens});

// Used to add instance methods onto the User Schema
UserSchema.methods.toJSON = function () {
    var user = this
    var userObject = user.toObject()

    return _.pick(userObject, ["_id", "email"])
}

UserSchema.methods.generateAuthToken = function () {
    let user = this
    let access = 'auth'
    let toTokenize = {
        _id: user._id.toHexString(),
        access
    }
    let token = jwt.sign(toTokenize, 'helloFromTheOtherSide').toString()

    user.tokens.push({access, token})

    return user.save().then(function () {
        return token
    })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}