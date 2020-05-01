//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let passport = require('../config/passportConfig')
let Sequelize = require('sequelize')
let userLogin = require('../middleware/userLogin')
//let poses = require('../yoga_api.json')
let fs = require('fs');



router.get('/schedule',(req,res)=>{
  const Op = Sequelize.Op
 let today = new Date();
 let in_four_weeks = new Date((today.getTime() + (30*24*60*60*1000)))
 //console.log('today ',today.toDateString(),' in_four_weeks ',in_four_weeks)
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

//Custom middleware that is Only applied to this route in this file
//this one applies to the entire router
router.use(userLogin)


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



router.get('/new',(req,res)=>{
  let timeSlot = timeslot()
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
  //console.log(req.body)
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

router.put('/show',(req,res)=>{
  //console.log(req.body)
  db.classevent.update(req.body,{
    where: { id: req.body.id},
    returning : true
  })
  .then(([row,cl])=>{
   // console.log("put route class",cl)
    res.redirect('/class/show')
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})

router.get('/show',(req,res)=>{

  db.classevent.findAll({
    order: [['classdate','ASC'],['classtype','ASC']],
    include: [ db.instructor, db.location, db.user,db.class_user]
  })
  .then(classes=>{
    res.render('class/show',{classes})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})

//Classes to show by category for instructor
router.get('/sort',(req,res)=>{

  db.classevent.findAll({
    order: [['classtype','ASC'],['classdate','ASC']],
    include: [ db.instructor, db.location, db.user,db.class_user]
  })
  .then(classes=>{
    res.render('class/showSortedByType',{ classes})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
 
})


//Classes to show for today for instructor
router.get('/sortToday',(req,res)=>{

  db.classevent.findAll({
    order: [['classdate','ASC'],['classtype','ASC']],
    include: [ db.instructor, db.location, db.user,db.class_user]
  })
  .then(classes=>{
    res.render('class/showToday',{ classes})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
 
})


router.get('/registerclass',(req,res)=>{
  const Op = Sequelize.Op
  let today = new Date();
  let in_four_weeks = new Date((today.getTime() + (30*24*60*60*1000)))
  db.classevent.findAll({
    where: {classdate: { [Op.between] : [ today, in_four_weeks ] } },
    order: [['classdate','ASC'],['starttime','ASC']],
    include: [ db.instructor, db.location, db.user, db.class_user ]
  })
  .then(classes=>{
    
    let msg = false;
    if(Object.keys(classes).length){
       msg = true;
    }
    //console.log('classes: register',classes)
    res.render('class/registerclass',{classes, msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

})

//Add users to a particular class
router.post('/userclass',(req,res)=>{
  console.log(req.body)
  db.classevent.findOne({
    where: {id: req.body.classeventId}
  })
  .then(cl=>{
    cl.addUser(req.body.userId)
      .then(()=>{
                    db.class_user.update(req.body,{
                      where: { 
                        userId: req.body.userId,
                        classeventId: req.body.classeventId
                      },
                      returning : true
                    })
                    .then(([row,clu])=>{
                      res.redirect('/class/userclass')
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
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
})

// show thw student/user his classes (registered)
router.get('/userclass',(req,res)=>{
  let msg= "";
  let userId = res.locals.user.dataValues.id;
  db.user.findOne({
    where : {id: userId},
    include: [db.classevent, db.class_user]
  })
  .then(user=>{
    res.render('class/userclass',{user,msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
 
})

router.get('/userUpcoming',(req,res)=>{
  let msg = "upcoming";

  let userId = res.locals.user.dataValues.id;
  db.user.findOne({
    where : {id: userId},
    include: [db.classevent, db.class_user]
  })
  .then(user=>{
    res.render('class/userclass',{user,msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
  
})

router.get('/userHistory',(req,res)=>{
  let msg = "history";

  let userId = res.locals.user.dataValues.id;
  db.user.findOne({
    where : {id: userId},
    include: [db.classevent, db.class_user]
  })
  .then(user=>{
    res.render('class/userclass',{user,msg})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
  
})

//User cannot attend the class so need to update the daatabase to change the flag to cancel
 router.put('/cancel',(req,res)=>{

  db.class_user.update(req.body,{
    where: { userId: req.body.userId,
            classeventId : req.body.classeventId
    },
    returning : true 
  })
  .then(([row,clu])=>{

     res.redirect('/class/userclass')
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
    
 })

router.get('/:id',(req,res)=>{
  let timeSlot = timeslot()
  db.classevent.findOne({
    where: {id: req.params.id},
    include: [db.instructor, db.location]
  })
  .then(cl=>{
    db.instructor.findAll()
    .then(instructors=>{
        db.location.findAll()
        .then(locations=>{
          res.render('class/edit',{ cl, instructors, locations, timeSlot })
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
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
    
  
})


router.delete('/:id', (req,res) => {
 
  // delete the relation first
  db.class_user.destroy({
    where: { classeventId: req.params.id }
  })
  .then(() => {
    // Now I am free to delete the class itself
    db.classevent.destroy({
      where: { id: req.params.id }
    })
    .then(cancelledClass => {
      res.redirect('/class/show')
    })
    .catch(err => {
      console.log('Oh no what happened', err)
      res.render('main/404')
    })
  })
  .catch(err => {
    console.log('Oh no what happened', err)
    res.render('main/404')
  }) 

  
})

//Export (allow me to include this in another page)
module.exports = router;