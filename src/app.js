const express = require('express')
require('dotenv').config()
const connectDB = require('./config/database')
const User = require('./models/user')

const port = 3000

const app = express()

app.use(express.json())

app.post('/users', async (req, res) => {

    // console.log(req.body)

    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send('User added successfully!!!')
    } catch (error) {
        res.status(400).send('Failed to add user...')
    }

    // user.save()

    // res.send('User added successfully!!!')
})

app.get('/users', async (req, res) => {
    try {
        
        const users = await User.find({})

        res.status(200).send(users)

    } catch (error) {
        res.status(404).send("Users not found.")
    }
})

app.get('/user', async (req, res) => {
    const userEmail = req.body.email
    try {

        const user = await User.find({
            email: userEmail
        })

        if ( user.length === 0 ) {
            res.status(404).send('User not found.')
            return
        } else {
            res.status(200).send(user)
        }


    } catch (error) {
        res.status(404).send('User not found.')
    }
})

app.delete('/user', async (req, res) => {
    console.log(req.body.id)

    try {
        const user = await User.findByIdAndDelete(req.body.id)
        res.status(200).send('User deleted successfully.')
    } catch (error) {
        res.status(404).send('User not found.')
    }
})

app.patch('/user/:userId', async (req, res) => {
    // const id = req.body.userId 
    const id = req.params?.userId 
    const data = req.body 

    console.log(id, data)

    try {

        const ALLOWED_UPDATES = [
            'firstName', 'lastName', 'age', 'skills'
        ]

        const isAllowed = Object.keys(data).every((key) => {
            return ALLOWED_UPDATES.includes(key)
        })

        if ( !isAllowed ) {
            throw new Error('Producted fields are not allowed to update.')
        }

        if ( data?.skills.length > 5 ) {
            throw new Error('Skills should not be more than 5.')
        }

        const user = await User.findByIdAndUpdate( { _id: id }, data, {
            returnDocument: "after",
            runValidators: true
        })

        console.log(user)

        res.status(200).send('User updated successfully.')

    } catch (error) {
        res.status(404).send(`Update user failed, ${error.message}`)
    }
})

const connect = async () => {
    try {
        await connectDB()

        app.listen(port, () => {
            console.log(`Server is running successfully on port ${port}....`)
        })

        console.log('DB connected successfully!!!')
    } catch (error) {
        console.log('DB connection failed...', error.message)
    }
}

connect()

app.use('/users', (req, res) => {
    res.send('Hello, this is subash developer users!!!')
})

app.use('/test', (req, res, next) => {
    console.log('first route handler')

    // this next function passes the control to the next route handler
    // that handler send to the callstack queue and then this function execute after that handler is executed
    // when after that handler executed, this handler send to the callstack queue and this function 
    // execute and return error because response is already sent to the client and this function try to send response again

    // so always use next() after response send to the client
    // next()  
    res.send('this is first route handler')
    next()

}, (req, res) => {
    console.log('second route handler')

    res.send('this is second route handler')
})