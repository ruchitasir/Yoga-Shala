//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let passport = require('../config/passportConfig')
let Sequelize = require('sequelize')


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
  db.classevent.findOrCreate({
    where: {
      classdate: req.body.classdate,
      starttime: req.body.starttime,
      endtime: req.body.endtime,
      instructorId: req.body.instructorId
    },
      defaults: req.body
  })
  .then(([classes,created])=>{
    res.redirect('/class/show')
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
  
})

router.get('/show',(req,res)=>{

  db.classevent.findAll({
    order: [['classdate','ASC']],
    include: [ db.instructor, db.location]
  })
  .then(classes=>{
    res.render('class/show',{classes})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})


router.get('/schedule',(req,res)=>{
  const Op = Sequelize.Op
 let today = new Date();
 var in_four_weeks = new Date((today.getTime() + (30*24*60*60*1000)))
// var temp = new Date((today.getTime() + (15*24*60*60*1000)))
 console.log('today ',today.toDateString(),' in_four_weeks ',in_four_weeks)
  db.classevent.findAll({
    where: {classdate: { [Op.between] : [ today, in_four_weeks ] } },
    order: [['classdate','ASC'],['starttime','ASC']],
    include: [ db.instructor, db.location]
  })
  .then(classes=>{
    console.log('classes:',classes)
    let msg = false;
    if(Object.keys(classes).length){
       msg = true;
    }
    res.render('class/showclass',{classes, msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})

router.get('/registerclass',(req,res)=>{
  const Op = Sequelize.Op
  let today = new Date();
 var in_four_weeks = new Date((today.getTime() + (30*24*60*60*1000)))
  db.classevent.findAll({
    where: {classdate: { [Op.between] : [ today, in_four_weeks ] } },
    order: [['classdate','ASC'],['starttime','ASC']],
    include: [ db.instructor, db.location]
  })
  .then(classes=>{
    console.log('classes:',classes)
    let msg = false;
    if(Object.keys(classes).length){
       msg = true;
    }
    res.render('class/registerclass',{classes, msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})

//Export (allow me to include this in another page)
module.exports = router;