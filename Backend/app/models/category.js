const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category