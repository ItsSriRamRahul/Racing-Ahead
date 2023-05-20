const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://rahulnxor:Portal321@cluster0.lojs27m.mongodb.net/?retryWrites=true&w=majority')

const ArenaSchema = mongoose.Schema({
    id:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    slot:[ {time:Number,available:Boolean} ],
    rating:Number,
    Location:{
        lat:Number ,
        lng:Number
    }

})
module.exports=mongoose.model("ARENA",ArenaSchema)