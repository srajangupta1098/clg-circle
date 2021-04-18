var mongoose = require('mongoose');
const Schema=mongoose.Schema
 
var clubSchema = new Schema({
    name: {type:String,required:true},
    desc: {type:String,required:true},
    moredesc:{type:String,required:true},
    facultyhead:{type:String,required:true},
    facultyemail:{
        type: String,
        minlength: [4, 'Invalid length! Minimum is 4 characters'],
        maxlength: [32, 'Invalid length! Maximum is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required!',
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
      },
    studenthead:{type:String,required:true},
    participants:[{type:Schema.Types.ObjectId,ref:"Participant"}],
    events:[{type:Schema.Types.ObjectId,ref:"Event"}],
    imgData:{type:String,required:true},
    imgName:{type:String,require:true},
    collegename:{type:String,required:true}
},{collection:'Club'});
 
//Image is a model which has a schema imageSchema
 
module.exports = mongoose.model('Club', clubSchema);