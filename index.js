const express= require('express');
const http= require('http');
const User = require('./models/models')
const mongoose= require('mongoose');


const app= express();
const Port=5000
app.use(express.json())
const server= http.createServer(app);

const Arena = require('./models/Arena');
const Booking=require('./models/booking');
mongoose.connect('mongodb+srv://rahulnxor:Portal321@cluster0.lojs27m.mongodb.net/?retryWrites=true&w=majority')


app.post('/addArena', async(req,res)=>{
   const arena=  new Arena({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        slot:req.body.slot,
        rating:req.body.rating,
        Location:{
            lat:req.body.Location.lat,
            lng:req.body.Location.lng
        }
    });
    
   try {
    await arena.save()
    res.send('Arena saved')
   } catch (error) {
    console.log(error)
   }
})

app.post('/book/:id',async(req,res)=>{
   

 const OTP = Math.floor(Math.random()*10000)

 const booking= new Booking({
    id:req.params.id,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    OTP:OTP,
    slot:{
        start:req.body.slot.start,
        end:req.body.slot.end,
        duration:req.body.slot.duration
    }
 })
 
   const duration = req.body.slot.duration
   const arenaExist = await Arena.findOne({id:req.params.id})
  
   if (arenaExist!= undefined) {
  const timeSlot= arenaExist.slot.find(ele=>
    ele.time===req.body.slot.start)
    if(timeSlot!=undefined && timeSlot.available===true){

        timeSlot.available = false
        arenaExist.save()
       
        booking.save()
        res.json(OTP)

       setTimeout(async()=>{
            timeSlot.available=true

          await Booking.findOneAndDelete({id:req.params.id}).exec()
          
           
          await  arenaExist.save()
            
            console.log('booking deleted')

       },duration*60000)
    } 
    else{
         const availableSlot= arenaExist.slot.filter(ele=>ele.available===true)
        res.json(availableSlot)
    }

}
else{
    res.send('invalid id')
}
})
app.get('/api/',async(req, res)=>{

  const ArenaSorted= await Arena.find().sort({rating:-1})
res.json(
    ArenaSorted
)
})
server.listen(process.env.PORT||Port,()=>{
    console.log(`Server is running onport ${Port}`);
})

