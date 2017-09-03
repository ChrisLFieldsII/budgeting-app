const dbConfig = require('../../config/server/db.json');
const db = dbConfig.db_url;
const logger = require('../logger.js');
var router = require('express').Router();
var Income = require('../models/incomeModel');

//EXAMPLE INCOME MODEL
// {
//     "income": "5000",
//     "date": "Fri 9-1-2017", 
//     "category": "food",
//     "desc": "dat sushi"
// }


// var income = new Income({
//     income: 50,
//     date: 'Fri 9-1-2017', //format: Fri 9-1-2017
//     category: 'food',
//     desc: 'dat sushi'
// });

//-----------BASE ROUTE -> /income/-------------
//GET METHODS
//used to get all income docs
router.get('/', function(req, res) {
    logger.info('I received GET req on incomeRoute "/"');
    Income.find({}).sort({date:1}).exec(function(err, incomes) {
        if (err) res.status(500).json(err);
        res.status(200).json(incomes);
    });
});

//used to get all income docs between fromDate-toDate
router.get('/:fromDate/:toDate', function(req, res) {
    logger.info('I received GET req on incomeRoute "/:fromDate/:toDate"');
    logger.info('income route req params from date: ',req.params.fromDate);
    logger.info('income route req params to date: ',req.params.toDate);
    Income.find({date: {$gte:req.params.fromDate, $lte:req.params.toDate}}).sort({date:1})
    .exec(function(err, incomes) {
        if (err) res.status(500).json(err);
        res.status(200).json(incomes);
    });    
});

//POST METHODS
//used to create income doc
router.post('/', function(req, res) {
    logger.info('I received POST req on incomeRoute "/" with body:');
    logger.info(req.body);
    var income = new Income(req.body);
    income.save(function (err, income) {
        if (err) res.status(400).json(err);
        res.status(201).json(income);
    });
});

module.exports = router;