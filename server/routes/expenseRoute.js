const dbConfig = require('../../config/server/db.json');
const db = dbConfig.db_url;
const logger = require('../logger.js');
var router = require('express').Router();
var Expense = require('../models/expenseModel');

//-----------BASE ROUTE -> /expense/-------------
//GET METHODS
//used to get all expense docs
router.get('/', function(req, res) {
    logger.info('I received GET req on expenseRoute "/" with body:');
    logger.info(req.body);
    Expense.find({}).sort({date:1}).exec(function(err, expenses) {
        if (err) res.status(500).json(err);
        res.status(200).json(expenses);
    });
});

router.get('/:fromDate/:toDate', function(req, res) {
    logger.info('I received GET req on expenseRoute "/:fromDate/:toDate"');
    logger.info('expense route req params from date: ',req.params.fromDate);
    logger.info('expense route req params to date: ',req.params.toDate);
    Expense.find({date: {$gte:req.params.fromDate, $lte:req.params.toDate}}).sort({date:1})
    .exec(function(err, expenses) {
        if (err) res.status(500).json(err);
        res.status(200).json(expenses);
    });    
});

//POST METHODS
//used to create expense doc
router.post('/', function(req, res) {
    logger.info('I received POST req on expenseRoute "/" with body:');
    logger.info(req.body);
    var expense = new Expense(req.body);
    expense.save(function(err, expense) {
        if (err) res.status(400).json(err);
        res.status(201).json(expense);
    });
});


module.exports = router;