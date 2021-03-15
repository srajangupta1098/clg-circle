var mongoose = require('mongoose');

 
var clubparticipantSchema = new mongoose.Schema({
    studentname:{type:String,required:true},
    rollno:{type:String,required:true},
    year:{type:Number,required:true},
    branch: {type:String,required:true},
    clubname:{type:String,required:true},
    collegename:{type:String,required:true}
},{collection:'Participant'});
 
//Image is a model which has a schema imageSchema
 
module.exports = mongoose.model('Participant', clubparticipantSchema);