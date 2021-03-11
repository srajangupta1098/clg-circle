var mongoose=require('mongoose')
mongoose.connect('mongodb+srv://srajan:gupta@cluster0.0jhlx.mongodb.net/collegecircle?retryWrites=true&w=majority',{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},()=>{console.log("connected to db")})
// .catch(e=>{console.error('Connection error',e.message)})

const db=mongoose.connection


module.exports=db