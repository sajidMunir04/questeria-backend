var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

passport.use(new LocalStrategy(function verify(username,password,cb) {
    db.one('Select user from data',[username],function(err,user) {
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

router.get('/login', function(req, res, next) {
    res.render('login');
});
  

router.post('/login/password',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}))

module.exports = router;