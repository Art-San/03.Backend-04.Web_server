const http = require('http')
const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')
const {addNote} = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
   if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, 'index.html'))
    // res.setHeader('Content-Type', 'text/html')
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(content)
   } else if (req.method === 'POST') {
    const body = []
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8' // Заголовки прописываем для старых браузеров
    })

    req.on('data', data => {     // on - добавляем событие
        // console.log('data', data) // data <Buffer 74 69 74 6c 65 3d 68 68 68 68>
        body.push(Buffer.from(data)) // Buffer.from - трансформация данных
    })

    req.on('end', () => {                    // 'end'- понимаем когда процес данных завершился
        // console.log('end', body.toString().split('=')[1].replaceAll('+', ' '))
        const title =  body.toString().split('=')[1].replaceAll('+', ' ')
        addNote(title)

        res.end(`Title = ${title}`) // закончили как получили данные
    })

    
   }
})

server.listen(port, () => {
    console.log(chalk.green(`Server has been on port ${port}...`))
})


