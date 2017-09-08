//general reqs
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//logger
const logger = require('./logger.js');

//mongodb
const dbConfig = require('../config/server/db.json');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.db_url, function(err) {
    if (err) logger.fatal('failed to connect to db');
    else logger.info('db connected!');
});

//create app/server instance
const app = express();

//use middleware
app.use(express.static(path.join(__dirname, '..'))); //enable server to use files from root folder
app.use(express.static(path.join(__dirname, '../public'))); //enable server to use files from public folder
app.use(express.static(path.join(__dirname, '../dist'))); //enable server to use files from dist folder
app.use(bodyParser.json());

//router paths
app.use('/income/', require('./routes/incomeRoute.js'));
app.use('/expense/', require('./routes/expenseRoute.js'));

logger.info('__dirname -> '+__dirname);

//catch 404 error
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

//error handling
app.use(function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send('Something broke!')
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    logger.info('Magic happening on port '+port);
});
