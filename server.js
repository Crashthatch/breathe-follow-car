const express = require('express')
const app = express()
const port = 9005


app.get('/', (request, response) => {
  response.redirect('index.html')
})

app.get('/vehicle', (request, response) => {

})

app.get('/observations', (request, response) => {
  console.log(request)

})


app.use(express.static('.'))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})