/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

let connections = []

const port = process.env.PORT || 3000
const server = express()

const { readFile, writeFile, unlink } = require('fs').promises

const setHeaders = (req, res, next) => {
  res.set('x-skillcrucial-user', '4f8e83ac-f75b-45e7-94ca-0a803ab0a9a8')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}
const saveFiles = async (users) => {
  const result = await writeFile(`${__dirname}/test.json`, JSON.stringify(users), {
    encoding: 'utf8'
  })
  return result
}
const readFiles = async () => {
  const result = await readFile(`${__dirname}/test.json`, { encoding: 'utf8' })
    .then((text) => {
      return JSON.parse(text)
    })
    .catch(async () => {
      const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
      await saveFiles(users)
      return users
    })
  return result
}
server.use(setHeaders)

server.use(cors())

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

server.get('/api/v1/users', async (req, res) => {
  
  const users = await readFiles()
  console.log(users)
  res.json(users)
}) // полностью правильно

server.post('/api/v1/users', async (req, res) => {
  const array = await readFiles()
  const addUser = req.body
  const newArr = [...array, {...addUser, id:array[array.length - 1].id + 1}]
  await saveFiles(newArr)
  res.json({ status: 'success', id: addUser.id })
})
server.patch('/api/v1/users/:userId', async (req, res) => {
  const users = await readFiles()
  const { userId } = req.params
  const bodyUser = req.body

  await saveFiles(users.map((item) => (item.id === +userId ? {...item, ...bodyUser} : item)))
  res.json({ status: 'success', id: userId })
})
server.delete('/api/v1/users', async (req, res) => {
  await unlink(`${__dirname}/test.json`)
  return res.send('All was deleted!')
}) // полностью правильно

server.delete('/api/v1/users/:userId', async (req, res) => {
  const users = await readFiles()
  const { userId } = req.params
  await saveFiles(users.filter((item) => item.id !== +userId))
  return res.json({ status: 'success', id: userId })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const echo = sockjs.createServer()
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})

  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
