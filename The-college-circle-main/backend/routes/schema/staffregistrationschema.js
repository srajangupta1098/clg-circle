const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt = require('bcryptjs')

const StaffRegistration=new Schema({
    firstname:{type:String,required:true},
    middlename:{type:String},
    lastname:{type:String,required:true},
    membertype:{type:String,required:true},
    collegename:{type:String,required:true},
    enrollmentno:{type:String,required:true},
    password:{type:String,required:true}, 
    email:{type:String,required:true},
    approve:{type:Boolean,default:false}
},{collection:'staffregistration'})

StaffRegistration.methods.hasSamePassword = function(providedPassword) {
    return bcrypt.compareSync(providedPassword, this.password)
  }
  StaffRegistration.pre("save",function(next){
    const user = this;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password = hash;
            next();
        })
    })
})

module.exports=mongoose.model('staffregistration',StaffRegistration)