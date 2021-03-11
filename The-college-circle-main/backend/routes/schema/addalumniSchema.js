var mongoose = require('mongoose');
 
var alumniSchema = new mongoose.Schema({
    name: {type:String,required:true},
    desc: {type:String,required:true},
    email:{type:String,required:true},
    batch:{type:String,required:true},
    branch:{type:String,required:true},
    imgData:{type:String,required:true},
    imgName:{type:String,require:true},
    collegename:{type:String,required:true}
},{collection:'Alumni'});
 
//Image is a model which has a schema imageSchema
 
module.exports = mongoose.model('Alumni', alumniSchema);