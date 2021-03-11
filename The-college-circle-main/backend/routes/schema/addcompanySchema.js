var mongoose = require('mongoose');
 
var companySchema = new mongoose.Schema({
    name: {type:String,required:true},
    desc: {type:String,required:true},
    imgData:{type:String,required:true},
    imgName:{type:String,require:true},
    collegename:{type:String,required:true}
},{collection:'Company'});
 
//Image is a model which has a schema imageSchema
 
module.exports = mongoose.model('Company', companySchema);