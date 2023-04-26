const express = require('express');
const route = express.Router();

const regCon = require('../controllers/regCon');
const ovCon = require('../controllers/ovCon');
const usCon = require('../controllers/usCon');
const prCon = require('../controllers/prCon');

//registration table
 route.post('/reg_insert', regCon.reg_insDetail);
 route.get('/reg_select', regCon.reg_selDetail);
 route.get('/reg_select/:id', regCon.reg_select_Detail);
 route.delete('/reg_delete/:id', regCon.reg_delDetail);
 route.put('/reg_update/:id', regCon.reg_upDetail);

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

// //product table
route.post('/pr_insert', prCon.pr_insDetail);
route.get('/pr_select', prCon.pr_selDetail);
route.get('/pr_select/:id', prCon.pr_select_Detail);
route.delete('/pr_delete/:id', prCon.pr_delDetail);
route.put('/pr_update/:id', prCon.pr_upDetail);

module.exports = route;