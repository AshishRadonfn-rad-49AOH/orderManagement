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
        trim: true
    },
    totalPrice : {
        type: Number,
        default : 0
    },
    totalOrders :{
        type:Number,
        default: 0,
        trim: true
    },
    discount:{ 
        type: Number,
        default : 0,
        trim: true
    }

},{timestamps: true})

module.exports = mongoose.model('customer', customerSchema)