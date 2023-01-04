const jwt = require('jsonwebtoken')
let customerModel = require('../model/customerModel')


const createCustomer = async (req, res) =>{
  try {
    let data = req.body;
    let {name,email,password, category, totalOrder} = data;
    if(!Object.keys(data).length){
       return res.status(400).send({status:false, message:'no data found'})
    }
    
    if(!name) return res.status(400).send({status:false, message:'Please enter the name'})
    if(!(/^\w[a-zA-Z]*$/.test(name))) return res.status(400).send({status:false, message:'Name should be in characters/alphabets only'})
    if(!email) return res.status(400).send({status:false, message:'Please enter the email'})
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send({status:false, message:'Email should be in proper'})
    if(!password) return res.status(400).send({status:false, message:'Please eneter the password'})
   

    let checkMail = await customerModel.findOne({email: email})
    if(checkMail) return res.status(400).send({status:false, message:'Email is already exist'})

    if (password.length < 8 || password.length > 15) return res.status(400).send({status: false, message: "password length should be between 8 to 15"});
   
    if(category) return res.status(400).send({status: false, message: "you can't give category You can create without using category"})
    if (totalOrder) return res.status(400).send({status: false, message: "You cant give totalOrder You can create without using totalOrder"})

    let savedData = await customerModel.create(data)
        return res.status(201).send({status: true, message: 'successfully customer created', data:savedData})
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }
}

const login = async (req, res) => {
  try {
    let data = req.body;
    let { email, password } = data;

    if (!Object.keys(data).length)
      return res.status(400).send({ status: false, message: "no data found" });

    if (!email) return res.status(400).send({ status: false, message: "Please enter the email" });
    if (!password) return res.status(400).send({ status: false, message: "Please enter the mobile number" });

    let findCustomer = await customerModel.findOne({ email: email });
    if (!findCustomer) return res.status(400).send({ status: false, message: "incorrect email" });

    if (password != findCustomer.password) return res.status(400).send({ status: false, message: "incorrect mobile number" });

    let token = jwt.sign(
      {
        customerId: findCustomer._id.toString()
      },
      
      'radon'
    );
    return res.status(200).send({status: true,message: "successfully created",token: token});
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
  


module.exports = {createCustomer, login}