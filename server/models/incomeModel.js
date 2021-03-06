const dbConfig = require('../../config/server/db.json');
const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
    income: Number,
    date: Date, 
    category: String,
    desc: String
});

const Income = mongoose.model('Income', incomeSchema, dbConfig.db_colls.income_coll); //3rd arg is coll name
module.exports = Income;