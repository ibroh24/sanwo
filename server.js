const express = require('express');
const app = express();
const http = require('http');
const dotEnv = require('dotenv');

if(process.env.NODE_ENV !== 'production'){ dotEnv.config();}


require('./startup/connection.js')();
require('./startup/routes')(app);

// setting up server
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, ()=>console.log(`server listening on ${port}`));

