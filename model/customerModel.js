const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        default: 'Regular',
        enum:['Regular','Gold','Platinum'],
        required: true,
        trim: true
    },
    totalPrice : {
        type: Number
    },
    totalOrders :{
        type:Number,
        trim: true
    },
    discount:{ 
        type: Number,
        trim: true
    }

},{timestamps: true})

module.exports = mongoose.model('customer', customerSchema)