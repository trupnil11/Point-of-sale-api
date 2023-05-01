const express = require('express');
const route = express.Router();

const caCon = require('../controllers/caCon');
const ovCon = require('../controllers/ovCon');
const usCon = require('../controllers/usCon');
const prCon = require('../controllers/prCon');
const { upload } = require('../helpers/upload');

//Customers table
 route.post('/ca_insert', caCon.ca_insDetail);
 route.get('/ca_select', caCon.ca_selDetail);
 route.get('/ca_select/:id', caCon.ca_select_Detail);
 route.delete('/ca_delete/:id', caCon.ca_delDetail);
 route.put('/ca_update/:id', caCon.ca_upDetail);

// //overview table
route.post('/ov_insert', ovCon.ov_insDetail);
route.get('/ov_select', ovCon.ov_selDetail);
route.get('/ov_select/:id', ovCon.ov_select_Detail);
route.delete('/ov_delete/:id', ovCon.ov_delDetail);
route.put('/ov_update/:id', ovCon.ov_upDetail);

//Users table
route.post('/us_insert', usCon.us_insDetail);
route.get('/us_select', usCon.us_selDetail);
route.get('/us_select/:id', usCon.us_select_Detail);
route.delete('/us_delete/:id', usCon.us_delDetail);
route.put('/us_update/:id', usCon.us_upDetail);

//product table
route.post('/pr_insert', upload.single('file') ,prCon.pr_insDetail);
route.get('/pr_select', prCon.pr_selDetail);
route.get('/pr_select/:id', prCon.pr_select_Detail);
route.delete('/pr_delete/:id', prCon.pr_delDetail);
route.put('/pr_update/:id', upload.single('file'),prCon.pr_upDetail);

module.exports = route;