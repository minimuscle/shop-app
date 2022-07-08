const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tags', (req, res) => {
  const sql = "SELECT * FROM TAGS"
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message)
    console.log(rows)
    res.send(rows)
  })
})

app.get('/categories', (req, res) => {
  const sql = "SELECT * FROM CATEGORIES"
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message)
    console.log(rows)
    res.send(rows)
  })
})


app.get('/products', (req, res) => {
  const sql = "SELECT * FROM PRODUCTS"
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message)
    console.log(rows)
    res.send(rows)
  })
})

app.get('/product/:id', (req, res) => {
  console.log(req.params.id)
  const sql = `SELECT * FROM PRODUCTS WHERE product_id = ${req.params.id}`
  db.each(sql, [], (err, row) => {
    if (err) return console.error(err.message)
    res.send(row)
  })
})

app.post("/add/product", jsonParser, function(req, res) {
  //FIXME: This doesn't work.
  let result = req.body
  console.log(req.body)
  const sql = `INSERT INTO PRODUCTS (name, description, price, category, image, tags)\
              VALUES ("${req.body.name}", "${req.body.description}", ${req.body.price}, "${req.body.category}", "${req.body.image}", "${req.body.tags}");`
  db.run(sql, [], (err, row) => {
    if (err) return console.error(err.message)
    res.send(row)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



const db = new sqlite3.Database('shop.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err)
  else console.log("Connected to shop database")
})