const express = require('express');
const app = express();
const http = require('http');

// setting up server
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, ()=>console.log(`server listning on ${port}`));

