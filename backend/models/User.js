const mongoose= require('mongoose')
const {Schema}=mongoose;

const UserSchema = new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
},
});
const Users=mongoose.model('User',UserSchema);
// Users.createIndexes();// we wont be creatin indexex using the emial 
module.exports=Users;