const Budget = require('../models/budget')
const budgetCltr = {}

budgetCltr.update = (req, res) => {
    const { amount } = req.body
    Budget.findOneAndUpdate({ user: req.tokenData._id },
        { amount: amount },
        { new: true })
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetCltr.list = (req, res) => {
    Budget.findOne({ user: req.tokenData._id })
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports = {
    budgetCltr
}