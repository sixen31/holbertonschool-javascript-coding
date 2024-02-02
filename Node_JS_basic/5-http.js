const http = require('http');
const fs = require('fs').promises;
const url = require('url');

async function readStudentFile(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    const students = lines.map(line => {
      const [firstName, , , field] = line.split(',');
      return { firstName, field };
    });

    const groupedByField = students.reduce((acc, student) => {
      if (!acc[student.field]) {
        acc[student.field] = [];
      }
      acc[student.field].push(student.firstName);
      return acc;
    }, {});

    const results = [`Number of students: ${students.length}`];
    Object.entries(groupedByField).forEach(([field, names]) => {
      const count = names.length;
      const list = names.join(', ');
      results.push(`Number of students in ${field}: ${count}. List: ${list}`);
    });

    return results;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (reqUrl === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (reqUrl === '/students') {
    const path = process.argv[2];
    res.write('This is the list of our students\n');
    readStudentFile(path)
      .then((data) => {
        res.write(data.join('\n'));
        res.end();
      })
      .catch((err) => {
        res.write(err.message);
        res.end();
      });
  }
});

const port = 1245;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
