const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nick1217',
  database: 'alarm'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle data submission
app.post('/update-daily', (req, res) => {
  const { date, fact, quote, vocab, challenge } = req.body;

  const sql = 'INSERT INTO daily (date, fact, quote, vocab, challenge) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [date, fact, quote, vocab, challenge], (err, result) => {
    if (err) throw err;
    res.send('Data inserted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

function updateDailyContent() {
  axios.get('http://localhost:3000/daily.html')
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const date = new Date().toISOString().split('T')[0];
      const fact = $('#fact').text();
      const quote = $('#quote').text();
      const vocab = $('#vocab').text();
      const challenge = $('#challenge').text();

      const query = 'INSERT INTO daily (date, fact, quote, vocab, challenge) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [date, fact, quote, vocab, challenge], (err, results) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
        } else {
          console.log('Data successfully inserted into MySQL:', results);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching the webpage:', error);
    });
}

// Schedule the task to run daily 
cron.schedule('* * * * *', () => {
  console.log('Running daily update task...');
  updateDailyContent();
});
