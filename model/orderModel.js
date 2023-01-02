const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: { 
        type: objectId, 
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
    },
    discount:{ 
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)