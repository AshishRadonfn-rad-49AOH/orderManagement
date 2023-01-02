const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router/route')
mongoose.set('strictQuery', true);

const app = express();

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://ashish2132:2vnf5TGDQgRP7ydu@cluster0.czfb8.mongodb.net/order1",{
    useNewUrlParser: true
})
.then(() => console.log('Mongoose is connected'))
.catch((error) => console.log(error.message))

app.use('/', router)

app.listen(process.env.PORT || 4000 , () => {
    console.log('server is connected to port :' + " "+(process.env.PORT || 4000))
})