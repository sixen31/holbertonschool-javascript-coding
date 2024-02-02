const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/any_endpoint') {
    res.end('Hello Holberton School!');
  } else {
    res.end('Hello Holberton School!');
  }
});

server.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

module.exports = server;
