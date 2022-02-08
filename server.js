const env = require('dotenv').config({path:'./.env'});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = {
  schedule: require('./controllers/schedule.js')
}

app.use(express.static('public'));
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));

app.post('/addToSchedule', server.schedule.addToSchedule);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
