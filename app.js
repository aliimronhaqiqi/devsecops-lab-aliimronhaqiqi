const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret Key (SAST Violation)
const API_SECRET_KEY = "SUPER_SECRET_KEY_12345!";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// VULNERABILITY 2: SQL Injection (SAST Violation)
app.get('/user', (req, res) => {
  let userid = req.query.id;
  let query = "SELECT * FROM users WHERE id = " + userid;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));