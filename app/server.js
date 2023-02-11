import apm from 'elastic-apm-node'

apm.start({
  serviceName: 'elasticstack',
  //secretToken: '',
  serverUrl: 'http://localhost:8200',
  environment: 'production'
})

import express from 'express'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  apm.startTransaction("index", "GET")
  console.debug("APM")
  res.send({ hello: "ok" })
  apm.endTransaction()
})

app.get('/error', (req, res) => {
  apm.startTransaction("simulate error", "GET")
  try {
    throw new Error('Ups, something broke!')
  } catch (err) {
    apm.captureError(err)
    apm.endTransaction()
    throw err
  }
})

app.listen(8080, () => {
  console.info("Server started at 8080")
})

