const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY

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

userSchema.methods.getJWT = async function() {
    const user = this

    const token = await jwt.sign({ _id: user.id }, secretKey)

    return token
}

userSchema.methods.validatePassword = async function(passwordFromUser) {
    const user = this

    const passwordHash = user.password 

    const isPasswordValid = await bcrypt.compare(
        passwordFromUser, passwordHash
    )

    return isPasswordValid
}

const User = mongoose.model('User', userSchema)

module.exports = User