const Category = require('../models/category')

const categoryCltr = {}

categoryCltr.list = (req, res) => {
    Category.find({ user: req.tokenData._id })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

categoryCltr.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.user = req.tokenData._id
    category.save()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

//Update Category:-(name)
categoryCltr.update = (req, res) => {
    const id = req.params.id
    const { name } = req.body

    Category.findOneAndUpdate(id, { name: name, user: req.tokenData._id }, { new: true })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

//Soft Delete Categories:-
categoryCltr.destroy = (req, res) => {
    const id = req.params.id
    Category.findOneAndUpdate({ _id: id, user: req.tokenData._id }, { isDeleted: true }, { new: true })
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = {
    categoryCltr
}