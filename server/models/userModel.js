const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {expenseSummaryModel: ExpenseSummary} = require('./expenseModel');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup method
userSchema.statics.signup = async function(email, password) {

    //validating email and password
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error('Please enter a valid email')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Please enter a strong password')
    }

    // check if email already exists
    const exists = await this.findOne({email})

    if(exists) {
        throw Error('email already in use')
    }
    // generating salt
    const salt = await bcrypt.genSalt(10)
    
    // hashing password
    const hash = await bcrypt.hash(password, salt)

    // creating new user
    const user = await this.create({email, password: hash})
    
    return user
}

//static login method
userSchema.statics.login = async function(email, password) {

    //validating email and password
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    // check if email already exists
    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }
    
    return user
}


module.exports = mongoose.model('User', userSchema)