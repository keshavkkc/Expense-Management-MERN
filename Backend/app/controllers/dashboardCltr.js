const Budget = require('../models/budget')
const Expense = require('../models/expense')
const Category = require('../models/category')

const dashboardCltr = {}

dashboardCltr.list = (req, res) => {
    Promise.all([Budget.findOne({ user: req.tokenData._id }), Expense.find({ isDeleted: false, user: req.tokenData._id }).populate('category')])
        .then((values) => {
            const [budget, expenses] = values

            const totalExpenses = expenses.reduce((acc, curr) => {
                return acc + curr.amount
            }, 0)

            const categories = expenses.reduce((categories, expense) => {
                const { category, amount } = expense
                if (!categories[category.name]) {
                    categories[category.name] = amount
                } else {
                    categories[category.name] += amount
                }
                return categories
            }, {})

            res.json({
                budget,
                totalExpenses,
                categories
            })
        })
        .catch((err) => {
            res.json(err.message)
        })
}


module.exports = {
    dashboardCltr
}