const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const customerModel = require("../model/customerModel")



//=========================================== Authentication ==================================================//


const authenticate = async function (req, res, next) {
  try {
    let token = req.headers["x-Api-Key"];
    if (!token) {
      token = req.headers["x-api-key"];
    }
    //If no token is present in the request header return error
    if (!token) {
      return res.status(400).send({ status: false, msg: "token must be present" });
    }

    let decodedToken = jwt.verify(token, "radon");
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
    req.customerId = decodedToken.customerId;
    next();
  }
  catch (error) {
    return res.status(500).send({ msg: " Server Error", error: error.message });
  }
}

module.exports = {authenticate}