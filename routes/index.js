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
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/api/user/register', function(req, res) {
  //res.render('register');
  res.render('register')
});

/*
router.post('/api/user/register', function(req, res) {
  //res.render('register');
  //res.send("ok")
  console.log(req.body.username)
  User.create(
    {
      username: req.body.username,
      password: req.body.password
    })
  res.redirect("/api/user/register")
  //next();
  
});
*/


router.post('/api/user/register', 
body("email").isLength({min: 3}).trim().escape(),
body("password").isLength({min: 5}),
(req, res, next) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) {
      console.log(err);
      throw err
    };
    if(user){
      return res.status(403).json({email: "Email already in use."});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;
          User.create(
            {
              email: req.body.email,
              password: hash
            },
            (err, ok) => {
              if(err) throw err;
              return res.send("ok")
              //return res.redirect("/api/user/register");
            }
          );
        });
      });
    }
  });
});




module.exports = router;
