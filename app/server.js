import apm from 'elastic-apm-node'
import pino from 'pino-http'

//const logger = pino()

apm.start({
  serviceName: 'elasticstack',
  //secretToken: '',
  serverUrl: 'http://apm:8200',
  environment: 'production'
})

import express from 'express'
const app = express()

app.use(express.json())
app.use(pino())

app.get('/', (req, res) => {
  apm.startTransaction("index", "GET")
  req.log.info("Hello!")
  res.send({ hello: "ok" })
  apm.endTransaction()
})

app.get('/error', (req, res) => {
  apm.startTransaction("simulate error", "GET")
  try {
    throw new Error('Ups, something broke!')
  } catch (err) {
    req.log.error("Error!")
    apm.captureError(err)
    apm.endTransaction()
    throw err
  }
})

app.listen(8080, () => {
  console.info("Server started at 8080")
})

