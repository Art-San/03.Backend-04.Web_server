const express = require('express')
const http = require('http')
const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')
const {addNote} = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, 'pages')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

// первый параметр это URL (внашем случае это "/")
// второй параетр колбек с параметрами req, res
app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'))
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.sendFile(path.join(basePath, 'index.html'))
})



app.listen(port, () => {                                   // app говорим что нужнр слушать
    console.log(chalk.green(`Server has been on port ${port}...`))
})


