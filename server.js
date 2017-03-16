const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.static('public'));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
        console.log('OPTIONS was requested');
        let headers = {};
        headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, accept, authorization";
        headers["Access-Control-Allow-Methods"] = "GET";
        headers["Access-Control-Allow-Origin"] = "*";
        res.writeHead(200, headers);
        res.end();
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
});

app.use('/', router);

app.listen(3000, () => 
    console.log('server running on: http://127.0.0.1:3000')
);

