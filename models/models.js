const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://rahulnxor:Portal321@cluster0.lojs27m.mongodb.net/?retryWrites=true&w=majority')

const UserSchema= new mongoose.Schema({
    name:String,
    age:Number,
    
})
    module.exports=mongoose.model('Users', UserSchema)