//general reqs
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//logger
const log4js = require('log4js');
log4js.configure(require('../config/server/log4js'));
const logger = log4js.getLogger('serverLogger');

//mongodb
const dbConfig = require('../config/server/db.json');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.db_url, function(err) {
    if (err) logger.fatal('failed to connect to db');
    else logger.info('connected!');
});

//create app/server instance
const app = express();

//use middleware
app.use(express.static(path.join(__dirname, '..'))); //enable server to use files from root folder
app.use(express.static(path.join(__dirname, '../public'))); //enable server to use files from public folder
app.use(express.static(path.join(__dirname, '../dist'))); //enable server to use files from dist folder
app.use(bodyParser.json());

logger.info('__dirname -> '+__dirname);

//handle server reqs
app.post('/income', function(req, res) {
    res.send('post res to income req')
});

//catch 404 error
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

//error handling
app.use(function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send('Something broke!')
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    logger.info('Magic happening on port '+port);
});
