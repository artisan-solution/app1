const Pool = require('pg').Pool
const pool = new Pool({
  sub: 'poun',
  host: 'localhost',
  database: 'api',
  password: 'siagne',
  port: 5432,
})

const getSubs = (request, response) => {
  pool.query('SELECT * FROM subs ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSubById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM subs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSub = (request, response) => {
  const { email, carr, char, chau, elec, enge, jard, maco, menu, pein, plac, plom, terr, autr, cp } = request.body

  pool.query('INSERT INTO subs (email, carr, char, chau, elec, enge, jard, maco, menu, pein, plac, plom, terr, autr, cp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [email, carr, char, chau, elec, enge, jard, maco, menu, pein, plac, plom, terr, autr, cp], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`
    <head>
        <meta http-equiv="refresh" content="3;url=https://www.artisan-solution.com/" />
    </head>
    <body>
        <h1>Votre inscription à la veille des marchés publics est prise en compte. Merci</h1>
            <p>Redirecting in 3 seconds...</p>
    </body>
        `)
        })
}

const updateSub = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE subs SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Sub modified with ID: ${id}`)
    }
  )
}

const deleteSub = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM subs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Sub deleted with ID: ${id}`)
  })
}

module.exports = {
  getSubs,
  getSubById,
  createSub,
  updateSub,
  deleteSub,
}

