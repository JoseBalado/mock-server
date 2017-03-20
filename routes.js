const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/logon', (req, res) => {
  console.log('logon was called');
  fs.createReadStream('logon.json').pipe(res);
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
  console.log('Infinity workareas was called');
  fs.createReadStream('data/infinity-workareas.json').pipe(res);
});

// Infinity sample workload data service
router.get('/csp/acb/services/Monitoring/MonitoringService.svc/inf_sample_count', (req, res) => {
  console.log('Infinity sample workload data was called');
  fs.createReadStream('data/infinity-sample-workload-data.json').pipe(res);
});


// Current TAT overview segmented workareas service
router.get(/inf_ovvtarget/, (req, res, next) => {
  if (req.query.workarea === '20') {
    console.log('Current TAT segmented workarea 20 was called');
    fs.createReadStream('data/current_tat-workareas-segmented.json').pipe(res);
  } else {
    next();
  }
});

// Current TAT workload data service
router.get('/*inf_ovvtarget', (req, res) => {
  console.log('Current TAT "cTAT only view" / "detail view" data was called');
  fs.createReadStream('data/current_tat-only-detail-view-data.json').pipe(res);
});

router.get('*', function (req, res) {
  res.status(404).send('Error 404: Resource not found');
});

router.post('*', function (req, res) {
  console.log(req);
});

module.exports = router;
