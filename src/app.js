const express = require('express')

const port = 3000

const app = express()

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

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}....`)
})