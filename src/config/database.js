const mongoose = require('mongoose')

const connectDB = async () => {
    const connect = await mongoose.connect(
        "mongodb+srv://sksubash062003_db_user:oXAYp1zvJQU6NfkA@subashdb.44t1ia9.mongodb.net/DevTinder"
    )
}

module.exports = connectDB