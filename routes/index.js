var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
// var config = require('../config');
// var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */


router.get('/', function(req, res, next) {
  console.log(req.user);
  if(req.user){res.render('index', { title: 'Code Talkers - a platform for sharing code.', 'user': req.user }); }
  res.render('firstpage', { title: 'Code Talkers - a platform for sharing code.', 'user': req.user,layout:false });
  
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Code Talkers - a platform for sharing code.','user': req.user});
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Code4Share - a platform for sharing code.','user': req.user});
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'Code Talkers - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'Code Talkers <no-reply@code4share.com>',
        to: 'karankhiani.kk@gmail.com',
        subject: 'You got a new message from visitor 💋 😽',
        text: req.body.message
      };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     return console.log(error);
      //   }
      //   res.render('thank', { title: 'Code4Share - a platform for sharing code.'});
      // });

    }
  });

module.exports = router;
