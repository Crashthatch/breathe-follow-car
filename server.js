const express = require('express')
const app = express()
const port = 9005
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'bathhacked',
  host: 'anpr.az0.co.uk',
  database: 'anpr',
  password: 'bathhacked',
})

app.get('/', (request, response) => {
  response.redirect('index.html')
})

app.get('/vehicle/:id', async (request, response) => {
  const { rows } = await pool.query('SELECT * FROM vehicles WHERE id = $1', [request.params.id])
  response.send(rows)
})

app.get('/observations/:id', async (request, response) => {
  const query = 'SELECT observations.id, t, site_id, name, location_id, direction, longitude, latitude ' +
    'FROM observations ' +
    'LEFT JOIN sites ON site_id = sites.id ' +
    'WHERE vehicle_id = $1';
  const { rows } = await pool.query(query, [request.params.id])
  response.send(rows)
})

app.use(express.static('.'))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})