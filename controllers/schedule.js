require('dotenv').config();
var express = require('express');
var app = express();
var knex = require('../db/knex');
var bodyParser = require('body-parser');

exports.addToSchedule = function (req, res, next) {
  console.log(req.body);
  knex('schedule')
  .where({id:0})
  .select('*')
  .then(function (data) {
    if (data.length > 0) {
      knex('schedule')
      .update({scheduleData:req.body.schedule})
      .then(function() {
        res.send('success');
      })
      .catch(function(err) {
        console.log(err);
        res.send('error')
      })
    } else {
      knex('schedule')
      .insert({scheduleData:req.body.schedule})
      .then(function() {
        res.send('success');
      })
      .catch(function(err) {
        console.log(err);
        res.send('error')
      })
    }
  })
}
