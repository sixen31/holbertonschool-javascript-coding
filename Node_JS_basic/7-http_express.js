const express = require('express');
const students = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  students(process.argv[2])
    .then((data) => {
      res.write('This is the list of our students\n');
      res.write(`Number of students: ${data.totalStudents}\n`);
      for (const field in data.fields) {
        if (Object.prototype.hasOwnProperty.call(data.fields, field)) {
          res.write(`Number of students in ${field}: ${data.fields[field].count}. List: ${data.fields[field].list.join(', ')}\n`);
        }
      }
      res.end();
    })
    .catch((err) => res.status(500).send(err.message));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;
