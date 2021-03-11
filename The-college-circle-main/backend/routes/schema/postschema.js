const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PostSchema=new Schema({
    post:{type:String,required:true},
    name:{type:String,required:true},
    type:{type:String,required:true},
    email:{type:String,required:true},
    time:{type:Date,default:Date.now},
    collegename:{type:String,required:true}
},{collection:'post'})


module.exports=mongoose.model('post',PostSchema)