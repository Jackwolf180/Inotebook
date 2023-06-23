// we are using another file to connect to the the database inorder to seperate our concerns so thhat the backend does not  gets messed up 
const { urlencoded } = require('express');
const mongoose= require('mongoose');
mongoose.set('strictQuery', true);
// const username=encodeURIComponent("adityagoswami26218");
// const password=encodeURIComponent("0Xt4GDwY9t4heAKr")
// const mongoURI= `mongodb+srv://${username}:${password}@cluster0.eqx04qw.mongodb.net/test`;// connection to the uri of the mongodb 
const mongoURI= "mongodb://127.0.0.1:27017";// connection to the uri of the mongodb 

const connetToMongo=()=>{
    mongoose.connect(mongoURI); // using the connect function of mongoose to connect to the uri of the mongodb
    console.log("connected to Mongo Successfully");
}
module.exports= connetToMongo; // exporting the the funcion 