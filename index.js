const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.query('SELECT * FROM User', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
app.post('/register', (req, res) => {
    const { name, number, location, address } = req.body;
   
    db.query('INSERT INTO User (name, number) VALUES (?, ?)', [name, number], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
   
      const userId = results.insertId;
   
      db.query('INSERT INTO Address (user_id, location, address) VALUES (?, ?, ?)', [userId, location, address], (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
   
        res.status(200).json({ message: 'User registered and address stored successfully' });
      });
    });
   });
   

const PORT = process.env.PORT || 3000;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
