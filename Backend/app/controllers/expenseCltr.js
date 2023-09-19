const Expense = require("../models/expense")

const expenseCltr = {}

expenseCltr.list = (req, res) => {
    Expense.find({ isDeleted: false, user: req.tokenData._id }).populate('category')
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCltr.deletedList = (req, res) => {
    Expense.find({ isDeleted: true, user: req.tokenData._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expenseCltr.show = (req, res) => {

}

expenseCltr.create = (req, res) => {
    const body = req.body
    const expense = new Expense(body)
    expense.user = req.tokenData._id
    expense.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

//Expense Soft Delete , Undo Delete
expenseCltr.update = (req, res) => {
    const id = req.params.id
    const action = req.query.action
    if (action === 'undo') {
        Expense.findOneAndUpdate({ _id: id, user: req.tokenData._id }, { isDeleted: false }, { new: true })
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    } else if (action === 'delete') {
        Expense.findOneAndUpdate({ _id: id, user: req.tokenData._id }, { isDeleted: true }, { new: true })
            .then((expense) => {
                res.json(expense)
            })
            .catch((err) => {
                res.json(err)
            })
    }
}

//Expense Edit:
expenseCltr.edit = (req, res) => {
    const id = req.params.id
    const body = req.body

    Expense.findByIdAndUpdate({ _id: id, user: req.tokenData._id }, body, { new: true })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = {
    expenseCltr
}