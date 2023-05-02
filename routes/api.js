const express = require('express');
const route = express.Router();

const caCon = require('../controllers/caCon');
const invenCon = require('../controllers/invenCon');
const usCon = require('../controllers/usCon');
const prCon = require('../controllers/prCon');
const orCon = require('../controllers/orCon');
const { upload } = require('../helpers/upload');

//Customers table
 route.post('/ca_insert', caCon.ca_insDetail);
 route.get('/ca_select', caCon.ca_selDetail);
 route.get('/ca_select/:id', caCon.ca_select_Detail);
 route.delete('/ca_delete/:id', caCon.ca_delDetail);
 route.put('/ca_update/:id', caCon.ca_upDetail);

//inventory table
route.post('/in_insert', invenCon.in_insDetail);
route.get('/in_select', invenCon.in_selDetail);
route.get('/in_select/:id', invenCon.in_select_Detail);
route.delete('/in_delete/:id', invenCon.in_delDetail);
route.put('/in_update/:id', invenCon.in_upDetail);

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

//order table
route.post('/or_insert',orCon.or_insDetail);
route.get('/or_select', orCon.or_selDetail);
route.get('/or_select/:id', orCon.or_select_Detail);
route.delete('/or_delete/:id', orCon.or_delDetail);
route.put('/or_update/:id', orCon.or_upDetail);

module.exports = route;