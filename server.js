const express = require('express');
const app = express();
const http = require('http');


require('./startup/connection.js')();
// setting up server
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, ()=>console.log(`server listening on ${port}`));

