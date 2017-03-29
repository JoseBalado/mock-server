'use strict';
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/csp/acb/services/logon', (req, res) => {
  console.log('logon was called');
  fs.createReadStream('data/logon.json').pipe(res);
});


// cITm locations service
router.get('/Monitoring/MasterDataService.svc/Locations', (req, res) => {
  console.log('cITm locations was called');
  fs.createReadStream('data/cITm-locations.json').pipe(res);
});

// cITm sample workload data service
router.get('/Monitoring/MonitoringService.svc/sample_count', (req, res) => {
  console.log('cITm sample_count was called');
  fs.createReadStream('data/cITm-sample_count.json').pipe(res);
});


// Infinity workareas service
router.get('/csp/acb/services/Monitoring/MasterDataService.svc/Workareas', (req, res) => {
  if (req.query.segmented === '1') {
    console.log('Infinity "Segmented workareas" was called');
    fs.createReadStream('data/infinity-segmented-workareas.json').pipe(res);
  } else {
    console.log('Infinity "Workareas" was called');
    fs.createReadStream('data/infinity-workareas.json').pipe(res);
  }
});

// Infinity sample workload data service
router.get('/csp/acb/services/Monitoring/MonitoringService.svc/inf_sample_count', (req, res) => {
  console.log('Infinity sample workload data was called');
  fs.createReadStream('data/infinity-sample-workload-data.json').pipe(res);
});

// Current TAT workload data service
router.get(/TATOverview/, (req, res) => {
  if (req.query.workarea === '25' || req.query.workarea === '26' || req.query.workarea === '28') {
    console.log(`Current TAT "Segmented workarea" ${req.query.workarea} was called`);
    fs.createReadStream('data/current-tat-segments.json').pipe(res);
  } else {
    console.log('Current TAT "cTAT only view" / "detail view" data was called');
    fs.createReadStream('data/current-tat-only-and-detail-view-data.json').pipe(res);
  }
});

router.all('*', function (req, res) {
  console.log(`router.all was called with method ${req.method}`);
  res.status(404).send('Error 404: Resource not found');
});

module.exports = router;
