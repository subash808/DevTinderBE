const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if ( !validator.isEmail(value) ) {
                throw new Error(`Please enter valid email address.`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if ( !validator.isStrongPassword(value) ) {
                throw new Error('Password is not strong enough.')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if ( !["male", "female", "others"].includes(value) ) {
                throw new Error('Gender is not valid.')
            }
        }
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User