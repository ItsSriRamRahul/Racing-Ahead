const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rahulnxor:Portal321@cluster0.lojs27m.mongodb.net/?retryWrites=true&w=majority')

const BookingSchema = mongoose.Schema({
    id:String,
    name:String,
    email:String,
    phone:String,
    OTP:Number,
    slot:{
        start:Number,
        end:Number,
        duration:Number,
    }
})
module.exports =mongoose.model("Booking",BookingSchema)