const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expense: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ExpenseApp = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseApp;
