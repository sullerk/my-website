// test-server-enhanced.js
import http from 'http';
import os from 'os';

const PORT = 8080; // Using a different port
const HOST = '127.0.0.1'; // Using localhost instead of 0.0.0.0

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

// Enhanced error handling
server.on('error', (error) => {
  console.error('\n=== SERVER ERROR ===');
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
  console.error('Port:', PORT);
  console.error('Host:', HOST);
  console.error('Error details:', error);
  console.error('===================\n');
  
  // Additional diagnostics
  console.log('\n=== SYSTEM INFO ===');
  console.log('Node.js version:', process.version);
  console.log('Platform:', process.platform);
  console.log('Architecture:', process.arch);
  console.log('Network interfaces:', JSON.stringify(os.networkInterfaces(), null, 2));
  console.log('==================\n');
  
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`\n=== SERVER STARTED ===`);
  console.log(`Server running at http://${HOST}:${PORT}/`);
  console.log(`Local network access: http://${os.hostname()}:${PORT}`);
  console.log('=====================\n');
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server has been stopped');
    process.exit(0);
  });
});