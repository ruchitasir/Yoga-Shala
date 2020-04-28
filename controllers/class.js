//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let passport = require('../config/passportConfig')

function timeslot(){
  let starttimeSlots =[];
  let endtimeSlots =[];
  let starttime = 5; // 5 am 
  for(i=0;i<=15;i++){
    starttime = 5+i 
    let starttimeStr= starttime +":00";
    let nexttimeStr = starttime + ":30";
    starttimeSlots.push(starttimeStr)
    starttimeSlots.push(nexttimeStr)
    if(i!=0){
      endtimeSlots.push(starttimeStr)
      endtimeSlots.push(nexttimeStr)
    }
  }
  endtimeSlots.push('21:00')
  endtimeSlots.push('21:30')
  endtimeSlots.push('22:00')
  return {starttimeSlots: starttimeSlots, endtimeSlots: endtimeSlots}
}
//GET /auth/login
router.get('/new',(req,res)=>{
  let timeSlot = timeslot()
  //console.log("start time: ",timeSlot.starttimeSlots)
  //console.log("end time: ",timeSlot.endtimeSlots)
    db.instructor.findAll()
    .then(instructors=>{
        db.location.findAll()
        .then(locations=>{
          res.render('class/new', { instructors, locations,timeSlot })
        })
        .catch(err=>{
          console.log(err)
          res.render('error')
        }) 
      })
      .catch(err=>{
        console.log(err)
        res.render('error')
      })
})


router.post('/show',(req,res)=>{
  console.log(req.body)
  res.render('class/show')
})

//Export (allow me to include this in another page)
module.exports = router;