var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const Snippet = require("../models/Snippet");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer");
const { json } = require('express');
const storage = multer.memoryStorage();
const upload = multer({storage})




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/*
router.get('/list', validateToken, (req, res, next) => {
  
  User.find({}, (err, users) =>{
    if(err) return next(err);
    const current_email = req.user.email
    console.log(req.user.email)
    res.render("index", {profile_email: current_email});
  })
  
});
*/
router.get('/posts', function(req, res) {
  res.render('posts');
});

//Here's another way of getting the current user from db and rendering it on the index page. 
/*
router.get('/list_of_users', validateToken, (req, res, next) => {
  User.find({}, (err, users) =>{
    if(err) return next(err);
    console.log(req.user.email)
    res.render("posts", {users});
  })
  
});
*/

//get for listing all the posts on the /posts page
router.get('/snippets', (req, res, next) => {
  Snippet.find({}, (err, snippets) =>{
    if(err) return next(err);
    //console.log(snippets)
    res.render("snippets", {snippets});
  })
  
});

//get request handler for getting the codesnippet comments. Using param id to find the correct comments from db
router.get('/comments/:id', (req, res, next) => {
  Snippet.findById({_id: req.params.id}, (err, snippets) =>{
    if(err) return next(err);
    res.render("comments", {snippets})
  })
  
});


//get request handler for the codesnippet-page. I'm setting the snippet_id as a hidden element to
//use it later on
router.get('/posts/:id', (req, res, next) => {
  //console.log(req.params.id)
  Snippet.findById({_id: req.params.id}, (err, snippet) =>{
    if(err) return next(err);
    res.render("code_snippet", {codesnippet: snippet.code, snippet_id: req.params.id});
  })
  
});

//post request handler for pushing a new comment to db objects array. Using id param again to identify the correct codesnippet
router.post('/posts/:id', upload.none(), (req, res, next) => {

  Snippet.findOneAndUpdate(
    {"_id": req.params.id},
    //the current_user is hidden element that i set a value from local storage to get the correct commentor to the db
    {$push: {"comments": {commentor: req.body.current_user, comment: req.body.comment}}},
    function(err, model){
       if (err){
         console.log("ERROR: ", err);
         res.send(500, err);
       }else{
         res.status(200).send(model);
       }
      }
    );

 
}); 

//form to create a post. Decided not to use any authorization here so you can get to the page
//without logging in but can't actually post anything to the database/posts-page since i'm using 
//authorization below in the post-request handler
router.get('/post.html', function(req, res) {
  res.render('create_post');
});

//Post-request handler for posting the new snippet to the database. Requires auth_token
router.post('/post.html', upload.none(), validateToken, function(req, res, next) {
  console.log(req.body.current_user)
  Snippet.create(
      {
        poster : req.body.current_user,
        subject: req.body.subject,
        code: req.body.snippet
      },
      (err, ok) => {
        if(err) throw err;
        return res.send("ok")
        }
    );
  })


//register page
router.get('/register.html', function(req, res) {
  res.render('register');
});

//login page
router.get('/login.html', function(req, res) {
  res.render('login');
});



//post-request handler for registering new user to the database. I got some email and password
//requirements commented out since it's much easier to test the program without them
router.post('/register.html', 
//body("email").isLength({min: 3}).trim().escape(),
//body("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}),
//body("username").isLength({min: 3}).trim().escape(),
//body("password").isLength({min: 5}),
upload.none(),

(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  //finding out if email address is already being used
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) {
      console.log(err);
      throw err
    };
    if(user){
      return res.status(403).json({message: "Email already in use."});
    } else {
      //if not any errors occur the password is being hashed and user added to the db
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
              }
          );
        });
      });
    }
  });
});



//Post-request handler for login. First finding out if the email matches with some
//registered user and then comparing the hashed passwords. I've set the auth_token
//to expire in 1 hour, i guess there's some other and better way to do this but 
//I think this is "kind of" secure and ok in this case.
router.post('/login.html',
  upload.none(),
  (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) =>{
    if(err) throw err;
    if(!user) {
      return res.status(403).json({message: "Login failed"});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: "1h"
            },
            (err, token) => {
              res.json({success: true, token});
            }
          );
        }else{
          return res.status(403).json({message: "Login failed"});

        }
      })
    }

    })

});


module.exports = router;
