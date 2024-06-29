var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var psqlDb = require('pg-promise');

passport.use(new LocalStrategy(function verify(username,password,cb) {
    db.one('Select user from data WHERE username = ?',[username],function(err,user) {
        if (err) {
            return cb(err);
        }

        if (!user) {
            return cb(null,false,{message: 'Incorrect Email or Password'});
        }

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

router.get('/login', function(req, res, next) {
    res.render('login');
});
  

router.post('/login/password',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      psqlDb.one(`INSERT INTO users (username, hashed_password, salt) VALUES (${req.body.username}, ${hashedPassword}, ${salt})`, function(err) {
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