const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcryptjs")
const Budget = require("./budget")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function () {
                return "invalid email format"
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 20
    }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    next()
                })
        })
})

userSchema.post('save', function (doc, next) {
    const budget = new Budget({ user: doc._id })
    return budget.save()
        .then((budget) => {
            // console.log('post', budget)
            next()
        })
        .catch((err) => {
            return Promise.reject(err)
        })
})

const User = mongoose.model('user', userSchema)

module.exports = User