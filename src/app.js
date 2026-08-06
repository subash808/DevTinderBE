const express = require('express')

const port = 3000

const app = express()

app.use((req, res) => {
    res.send('Hello, this is subash developer!!!')
})

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}....`)
})