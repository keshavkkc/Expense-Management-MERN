const mongoose = require("mongoose")
const Schema = mongoose.Schema

const budgetSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Budget = mongoose.model('budget', budgetSchema)

module.exports = Budget