var mongoose = require('mongoose');

 
var eventSchema = new mongoose.Schema({
    eventname:{type:String,required:true},
    venue:{type:String,required:true},
    time:{type:Date,default:Date.now},
    eventdesc: {type:String,required:true},
    
    collegename:{type:String,required:true}
},{collection:'Event'});
 
//Image is a model which has a schema imageSchema
 
module.exports = mongoose.model('Event', eventSchema);