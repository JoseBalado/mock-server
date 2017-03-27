const express = require('express');
const app = express();
const router = require('./routes');

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
        console.log('OPTIONS was requested');
        let headers = {
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, accept, authorization",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*"
        };
        res.writeHead(200, headers);
        res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    next();
  }
});

app.use('/', router);

app.listen(3000, () => 
    console.log('server running on: http://127.0.0.1:3000')
);

