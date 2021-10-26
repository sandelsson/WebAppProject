var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
/*
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/user/register', function(req, res, next) {
  //res.render('register');
  res.render('register')
});

router.post('/api/user/register', function(req, res, next) {
  //res.render('register');
  res.render('register')
});
/*
router.post('/user/register', function(req, res, next) {
  res.send('ok');
});
*/
module.exports = router;
