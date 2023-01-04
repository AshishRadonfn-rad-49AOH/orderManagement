const orderModel = require("../model/orderModel");
const customerModel = require("../model/customerModel");


const createOrder = async (req, res) => {
  try {
    let data = req.body;

    if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "no data found" });
    let {customerId, orderName, totalPrice} = data;

    let customer = await customerModel.findOne({_id: customerId});
    if(!customer){
        return res.status(404).send({ status: false, message: "No customer Found" });
    }

    if(!orderName) return res.status(400).send({status: false, message: 'Please enter the Order name'})
    if(!(/^[A-Za-z\s]*$/.test(orderName))) return res.status(400).send({status: false, message: 'Order name should be in alphabets'})

    if(!totalPrice) return res.status(400).send({status: false, message: 'Please enter the Price'})
    if(!(/^[0-9]+$/.test(totalPrice))){
        return res.status(400).send({ status: false, message: "Enter valid price" });
    }
    
      let discount=0;
      let category = "Regular";
      let totalOrders = customer.totalOrders+1;

      if(totalOrders<10){
        discount = 0 ;
        totalPrice=totalPrice;
      }
      else if(totalOrders>=10 && totalOrders<20){
        discount = (totalPrice*10)/100;
        category='Gold';
        totalPrice = (totalPrice*90)/100;
      }
      else{
        discount = (totalPrice*20)/100;
        category='Platinum'
        totalPrice = (totalPrice*80)/100;
      }
      


      await customerModel.findByIdAndUpdate({_id: customerId},{$set:{category,totalOrders:totalOrders}, totalPrice: totalPrice,discount: discount},{new:true});

      let orderData = await orderModel.create(data)
      return res.status(201).send({status:true,message:"successfully order created",data: orderData})
  }
  catch (error)
    {
      return res.status(500).send({ status: false, message: error.message });
    }
}

const getOrder = async (req, res) => {
  try {
    let getCustomer = await orderModel.find().populate('customerId',{__v:0, upadatedAt:0, deletedAt: 0})
  if(getCustomer.length == 0) return res.status(400).send({status:false, message: "Customer id not found"})

  return res.status(200).send({status: true, message: 'successfully gettting order details', getCustomer})
  } catch (error) {
    return res.status(500).send({status: false, message:error.message})
  }
}

module.exports={createOrder, getOrder}