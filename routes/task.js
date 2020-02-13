var express = require('express');

var mongoUtil = require( './../lib/mongoUtil' );
var Task=require('./../models/task');
var router = express.Router();
mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  var db = mongoUtil.getDb();
  var cl2=db.collection( 'Task' );



router.get('/createTask', function(req, res) {
  var newTask = new Task();

  cl2.insertOne(newTask,function( err, data) {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/task/' + data._id);
    }
  })
});

router.get('/task/:id', function(req, res) {
  if (req.params.id) {
    Task.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        res.render('error');
      }

      if (data) {
        res.render('task', {content: data.content, roomId: data.id});
      } else {
        res.render('error');
      }
    })
  } else {
    res.render('error');
  }
});

});

module.exports = router;