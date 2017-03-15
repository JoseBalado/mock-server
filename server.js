const express = require('express');
const app = express();
const fs = require('fs');


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

app.get('/logon', (req, res) => {
  console.log('logon was called');
  fs.createReadStream('logon.json').pipe(res);
});


// cITm locations service
app.get('/Monitoring/MasterDataService.svc/Locations', (req, res) => {
  console.log('cITm locations was called');
  fs.createReadStream('cITm-locations.json').pipe(res);
});

// cITm sample workload data service
app.get('/Monitoring/MonitoringService.svc/sample_count', (req, res) => {
  console.log('cITm sample_count was called');
  fs.createReadStream('cITm-sample_count.json').pipe(res);
});


// Infinity workareas service
app.get('/csp/acb/services/Monitoring/MasterDataService.svc/Workareas', (req, res) => {
  console.log('Infinity workareas was called');
  fs.createReadStream('infinity-workareas.json').pipe(res);
});

// Infinity sample workload data service
app.get('/csp/acb/services/Monitoring/MonitoringService.svc/inf_sample_count', (req, res) => {
  console.log('Infinity sample workload data was called');
  fs.createReadStream('infinity-sample-workload-data.json').pipe(res);
});


// Current TAT overview segmented workareas service
app.get(/inf_ovvtarget/, (req, res, next) => {
  if (req.query.workarea === '20') {
    console.log('Current TAT segmented workarea 20 was called');
    fs.createReadStream('current_tat-workareas-segmented.json').pipe(res);
  } else {
    next();
  }
});

// Current TAT workload data service
app.get('/*inf_ovvtarget', (req, res) => {
  console.log('Current TAT detail view data was called');
  fs.createReadStream('current_tat-only-view-data.json').pipe(res);
});

app.get('*', function (req, res) {
  res.status(404).send('Error 404: Resource not found');
});

app.post('*', function (req, res) {
  console.log(req);
});

app.listen(3000, () => 
    console.log('server running on: http://127.0.0.1:3000')
);

