const http = require('http');
require('dotenv').config();
const connectDB = require('./config/db');
const apiRouter = require('./routes/api');


connectDB();

const PORT = process.env.BACKEND_PORT || 5000;


const server = http.createServer((req, res) => {
  
  apiRouter.handle(req, res);
});


server.on('error', (err) => {
  console.error('Server error occurred:', err.message);
});


server.listen(PORT, () => {
  console.log(`Native HTTP Server running on port ${PORT}`);
  console.log(`CORS allowed for: http://localhost:3000`);
});
