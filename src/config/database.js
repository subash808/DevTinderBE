const mongoose = require('mongoose')

const connectDB = async () => {
    
    const dburl = process.env.DB_URL

    const connect = await mongoose.connect(dburl)
}

module.exports = connectDB 