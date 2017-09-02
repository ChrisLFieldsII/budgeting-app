const dbConfig = require('../../config/server/db.json');
const db = dbConfig.db_url;
const logger = require('../logger.js');
var router = require('express').Router();
var Expense = require('../models/expenseModel');

router.get('/', function(req, res) {
    logger.info('I received GET req on expenseRoute "/" with body:');
    logger.info(req.body);
    Expense.find(function(err, expenses) {
        if (err) res.status(500).json(err);
        res.status(200).json(expenses);
    });
});

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