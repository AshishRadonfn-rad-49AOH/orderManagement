const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: { 
        type: ObjectId, 
        required: true, 
        ref: 'customer' 
    },
    orderName: {
        type:String,
        trim: true
    },
    totalPrice: { 
        type: Number, 
        trim: true 
    }
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)