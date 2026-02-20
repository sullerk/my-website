import http from 'http';
import os from 'os';

const port = 3001; // Using a different port

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${port}/`);
  console.log(`Network access: http://${os.hostname()}:${port}`);
});
