const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.set('json spaces', 2) // Olivier : IMPORTANT : this is to have json format and indent

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//app.get('/subs', db.getSubs)
//app.get('/subs/:id', db.getSubById)
app.post('/subs', db.createSub)
//app.put('/subs/:id', db.updateSub)
//app.delete('/subs/:id', db.deleteSub)
//
