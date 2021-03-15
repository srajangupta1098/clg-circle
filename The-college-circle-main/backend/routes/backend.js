var collegeRegistrationSchema = require('./schema/collegeregistrationschema')
var StaffRegistrationSchema = require('./Schema/staffregistrationschema')
var postSchema = require('./schema/postschema')
var nodemailer=require('nodemailer');
var fs = require('fs');
var path = require('path');
var CompanySchema = require('./schema/addcompanySchema');
//const addalumniSchema = require('./schema/addalumniSchema');
var AlumniSchema = require('./schema/addalumniSchema');
var ClubSchema = require('./schema/addclubSchema');
var EventSchema = require('./schema/eventSchema');
var ParticipantSchema = require('./schema/clubparticipantSchema');
const { useRadioGroup } = require('@material-ui/core');
 


exports.collegeRegistraion = async(req,res)=>{
    const body = req.body
    console.log("A:",body)
    const newData = new collegeRegistrationSchema(body)
    newData.save((error,result)=>{
        if(error)
        {
            console.log(error)
            return res.status(400).send({error:'Data Error',message:"Try again"})
        }
        else
        {
            console.log("ASD:",result)
            var link = `localhost:3000/validationform/${result._id}`
            var transporter=nodemailer.createTransport({
                service: 'gmail',
                secure:false,
            auth: {
                user: 'thedailyofferjuet@gmail.com',
                pass: 'cpcolony@128'
            }
            });
        
            let mailOptions ={
                from :'TheCollegeCircle',
                to:'s22ubbu@yahoo.com',
                subject:'mail for authentication at college circle',
                text:link
            };
            transporter.sendMail(mailOptions,function(error,result){
                if(error)
                {
                    console.log(error)
                    return res.status(500).json({RESULT:false})
                }
                else{
                    console.log('Email send')
                    return res.status(201).json({success:true,message:"request send"})
                }
            })
        }
    })
}
exports.getcollegeregistration = async(req,res)=>{
const id = req.params.id
console.log("ID:",id)
collegeRegistrationSchema.findById(id,(error,result)=>{
    if(error)
    {
        console.log("ASDF")
        return res.status(422).send({message:"Not found"})
    }
    else
    {
        return res.status(200).send({message:"data retrieved",result})
    }
});
}

exports.deletecollegeRegistration = async(req,res)=>{
    const id = req.params.id
    console.log("ASD:",id)
    await collegeRegistrationSchema.findByIdAndDelete({_id:id},(error,result)=>{
        if(error)
        {
            return res.status(422).send({message:"Not found"})
        }
        else
        {
            return res.status(200).send({message:"data retrieved",result})
        }
    })
}

exports.approvecollegeRegistration = async(req,res)=>{
    const id = req.params.id
    await collegeRegistrationSchema.findByIdAndUpdate({_id:id},{approve:true},(error,result)=>{
        if(error)
        {
            return res.status(422).send({message:"Not found"})
        }
        else
        {
            return res.status(200).send({message:"approved"})
        }
    })
}


exports.staffRegistration = async(req,res) =>{
    const body = req.body
    const {email} = req.body
    StaffRegistrationSchema.findOne({email:email},(error,existinguser)=>{
        if(error)
        {
            return res.status(400).send({message:"Something went wrong please try again"})
        }
        if(existinguser)
        {
            return res.status(422).send({message:"User Exist"})
        }
        const newData = new StaffRegistrationSchema(body)
        newData.save((error)=>{
            if(error)
            {
                console.log(error)
                return res.status(400).send({error:'Data Error',message:"Try again"})
            }
            console.log("!")
            return res.status(201).json({success:true,message:"request send"})
        })
    })
}

exports.login = async(req,res) =>{
    const {email,password,collegename,membertype}=req.body
    console.log("ASD",req.body)
    StaffRegistrationSchema.findOne({email:email,collegename:collegename,membertype:membertype},(error,existinguser)=>{
        if(error)
        {
            return res.status(400).send({message:"Something went wrong please try again"})
        }
        if(!existinguser)
        {
            console.log("L")
            return res.status(422).send({message:"User doesn't exist"})
        }
        if(existinguser.hasSamePassword(password))
        {
            return res.status(200).send({existinguser,message:"logedin"})
        }
        else
        {
            console.log("K")
            return res.status(422).send({message:"wrong password"})
        }
    })
}

exports.addpost = async(req,res)=>{
    const body = req.body
    console.log("body:",body)
    var name=""
    await StaffRegistrationSchema.findOne({email:body.email},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"user not found"})
        }
        else
        {
            console.log("result:",result)
            name = result.firstname+" "+result.lastname
            body.name = name
            console.log("combined:",body)
            const newData = new postSchema(body)
            newData.save((error,result)=>{
                if(error)
                {
                    console.log("error:",error)
                    return res.status(402).send({message:"Post not saved, please try again"})
                }
                else
                {
                    return res.status(200).send({message:"Post saved"})
                }
            })
        }
    })
}

exports.getpost = async(req,res)=>{
    const collegename = req.params.name
    await postSchema.find({collegename:collegename},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}

exports.addcompany = async(req, res) => {
 
    console.log("L:",req.body,"K:",req.file)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        imgData:req.file.path,
        imgName:req.file.originalname,
        collegename:req.body.collegename
    }
    const newData = new CompanySchema(obj)
    newData.save((error,result) => {
        if (error) {
            console.log(error);
            return res.status(402).send({message:"Company not added"})
        }
        else {
            return res.status(200).send({message:"Company added"})
        }
    });
};


exports.getcompany = async(req,res)=>{
    const collegename = req.params.name
    await CompanySchema.find({collegename:collegename},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}

exports.addalumni = async(req, res) => {
 
    console.log("L:",req.body,"K:",req.file)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        email:req.body.email,
        branch:req.body.branch,
        batch:req.body.batch,
        imgData:req.file.path,
        imgName:req.file.originalname,
        collegename:req.body.collegename
    }
    const newData = new AlumniSchema(obj)
    newData.save((error,result) => {
        if (error) {
            console.log(error);
            return res.status(402).send({message:"Alumni not added"})
        }
        else {
            return res.status(200).send({message:"Alumni added"})
        }
    });
};


exports.getalumni = async(req,res)=>{
    const collegename = req.params.name
    console.log("LL",collegename)
    await AlumniSchema.find({collegename:collegename},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}


exports.addclub = async(req, res) => {
 
    console.log("L:",req.body,"K:",req.file)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        moredesc:req.body.moredesc,
        facultyhead:req.body.facultyhead,
        facultyemail:req.body.facultyemail,
        studenthead:req.body.studenthead,
        participants:req.body.participants,
        events:req.body.events,
        imgData:req.file.path,
        imgName:req.file.originalname,
        collegename:req.body.collegename
    }
    const newData = new ClubSchema(obj)
    newData.save((error,result) => {
        if (error) {
            console.log(error);
            return res.status(402).send({message:"Club not added"})
        }
        else {
            return res.status(200).send({message:"Club added",result})
        }
    });
};


exports.getclub = async(req,res)=>{
    const collegename = req.params.name
    console.log("LL",collegename)
    await ClubSchema.find({collegename:collegename}).populate("events").populate("partcipants").exec((error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}


exports.getClubById= async (req, res) => {
    const id = req.params.id;
    
    await ClubSchema.findById({_id:id}).populate("events").populate("participants").exec((error,foundClub)=>{

        
      if (error)
        { 
           return res.status(402).send({message:"club not found"}); 
        }

      return res.status(200).send({foundClub})
    })
  
    
  }


  exports.addClubById= function (req,res){
      const id = req.params.id;
      EventSchema.create(req.body)
      
      .then(function(foundevent){

        return ClubSchema.findByIdAndUpdate({_id:id},{event:foundevent._id},{new:true});
      })
      .then(function(foundClub){
          res.json(foundClub);
      })
      .catch(function(err){
          res.json(err);
      });
  }

  exports.getevent = async(req,res)=>{
    const collegename = req.params.name
    console.log("LL",collegename)
    await EventSchema.find({collegename:collegename},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}

exports.participantregistration = async(req,res)=>{
    await ClubSchema.findOne({name:req.body.name}).then((club)=>{
        
        const newData=new  ParticipantSchema(req.body)
        newData.save((error,result)=>{
            
            if(error)
        {
            console.log(error)
            return res.status(400).send({error:'Data Error',message:"Try again"})
        }
        else
        {   

            console.log("ASD:",result)
            var link = `localhost:3000/validationform/${result._id}`
            var transporter=nodemailer.createTransport({
                service: 'gmail',
                secure:false,
            auth: {
                user: 'thedailyofferjuet@gmail.com',
                pass: 'cpcolony@128'
            }
            });
        
            let mailOptions ={
                from :'TheCollegeCircle',
                to:club.facultyemail,
                subject:'mail for authentication at college circle',
                text:link
            };
            transporter.sendMail(mailOptions,function(error,result){
                if(error)
                {
                    console.log(error)
                    return res.status(500).json({RESULT:false})
                }
                else{
                    console.log('Email send')
                    return res.status(201).json({success:true,message:"request send"})
                }
            })
        }
    })
        })
        
    }


exports.getparticipantregistration = async(req,res)=>{
    const id = req.params.id
    console.log("ID:",id)
    ParticipantSchema.findById(id,(error,result)=>{
        if(error)
        {
            console.log("ASDF")
            return res.status(422).send({message:"Not found"})
        }
        else
        {
            return res.status(200).send({message:"data retrieved",result})
        }
    });
}

exports.deleteparticipantRegistration = async(req,res)=>{
    const id = req.params.id
    const name=req.params.name
    console.log("ASD:",id)
    await ParticipantSchema.findByIdAndDelete({_id:id},(error,result)=>{
        if(error)
        {
            return res.status(422).send({message:"Not found"})
        }
        else
        {
            ClubSchema.findOne({name}).then((error,result))
            {
                if(error){
                    return res.status(403).send({message:"not found"})
                }
                else{
                    result.participants.filter(user_id=>user_id!==id)
                    result.save((error,result)=>{
                        if(error){
                            return res.status(403).send({message:"not found"})
                        }
                        else{
                            return res.status(200).send({message:"data retrieved"})
                        }
                    })
                }
            }
            return res.status(200).send({message:"data retrieved",result})
        }
    })
}

exports.approveparticipantRegistration = async(req,res)=>{
    const id = req.params.id
    const name=req.params.name
    await ParticipantSchema.findByIdAndUpdate({_id:id},{approve:true},(error,result)=>{
        if(error)
        {
            return res.status(422).send({message:"Not found"})
        }
        else
        {
            ClubSchema.findOne({name}).then((error,result))
            {
                if(error){
                    return res.status(403).send({message:"not found"})
                }
                else{
                    result.participants.push(id)
                    result.save((error,result)=>{
                        if(error){
                            return res.status(403).send({message:"not found"})
                        }
                        else{
                            return res.status(200).send({message:"data retrieved"})
                        }
                    })
                }
            }
            return res.status(200).send({message:"approved"})
        }
    })
}

exports.getCollegename = async(req,res)=>{
    await collegeRegistrationSchema.find({approve:true},{collegename:1},(error,result)=>{
        if(error)
        {
            return res.status(402).send({message:"college not found"})
        }
        else
        {
            console.log("AS:",result)
            return res.status(200).send({result})
        }
    })
}

