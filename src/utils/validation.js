const validator = require('validator')


const validateUser = (req) => {

    const { firstName, email, password, age } = req.body

    if ( !firstName ) {
        throw new Error('First name should be not empty.')
    }

    if ( !validator.isEmail(email) ) {
        throw new Error('Please enter valid email address.')
    }

    if ( !validator.isStrongPassword(password) ) {
        throw new Error('Password should be at least 8 characters long and include a mix of letters, numbers, and special characters.')
    }

    if ( age <= 18 ) {
        throw new Error('Age should be greater than 18.')
    }

}

module.exports = {
    validateUser
}