const dbConfig = require('../../config/server/db.json');
const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    expense: Number,
    date: Date,
    category: String,
    desc: String
});

const Expense = mongoose.model('Expense', expenseSchema, dbConfig.db_colls.expense_coll);
module.exports = Expense;