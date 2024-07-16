var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const pgp = require('pg-promise')();
const { userDatabaseLink } = require('../configuration');
const db = pgp(userDatabaseLink);

passport.use(new LocalStrategy(function verify(username,password,cb) {
    db.none('Select user from Users WHERE email = $1',[username],function(err,user) {
        if (err) {
            return cb(err);
        }

        console.log('No Error Occured!');

        if (!user) {
            return cb(null,false,{message: 'Incorrect Email or Password'});
        }

        console.log('If no user then should return',user);

        crypto.pbkdf2(password, 2,310000,32, 'sha256', function(err,hashedPassword) {
            if (err) {
                return cb(err);
            }
    
            if (!crypto.timingSafeEqual(user.hashedPassword,hashedPassword)) {
                return cb(null,false,{message: 'Incorrect Email or Password'});
            }   

            if (user.hashedPassword !== hashedPassword) {
                return cb(null, false);
            }

            return cb(null,user);
        })

        console.log('Should Not reach here!');
    })
}))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
  

router.post('/user/login',passport.authenticate('local', {

}))

router.post('/user/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.post('/user/signup', function(req, res, next) {

  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      db.none('INSERT INTO Users (email, hashed_password, salt, first_name, last_name,unique_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [req.body.username, hashedPassword,salt,req.body.firstName,req.body.lastName,req.body.uniqueID], function(err) {
        if (err) { return next(err); }
        var user = {
          id: this.lastID,
          username: req.body.username
        };
        req.login(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    });
  });

module.exports = router;