//Node Modules/Variables
let router = require('express').Router();
let db = require('../models')
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let fs = require('fs');
let axios = require('axios')
const API_URL= 'https://quote-garden.herokuapp.com/quotes/random'
//Custom middleware that is Only applied to this route in this file
//this one applies to the entire router
router.use(userLogin)

//Protect this route from users who are not logged in
router.get('/user',(req,res)=>{
  let poseAPI = fs.readFileSync('./yoga_api.json');
   let poses = JSON.parse(poseAPI);
   let quote =""
  
  
   res.render('profile/user',{ moment, poses, quote: quote })
  /*  axios.get(API_URL)
    .then(response => {
      res.render('profile/user',{ moment, poses, quote: response.data })
    })
    .catch(err=>{
      console.log(err)
      res.render('error')
    }) */
   
})

//Get /profile/guest/userId- viewing a user's profile as a guest
router.get('/guest/:id',(req,res)=>{
  db.user.findByPk(req.params.id)
  .then(userProfile=>{
    res.render('profile/guest',{moment, userProfile})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })
})

//Protect this route from users who are not logged in and users who are not admins
// adminLogin will only apply to the route below but router.use(userLogin) will apply to the entire router
router.get('/admin',adminLogin,(req,res)=>{
  let poseAPI = fs.readFileSync('./yoga_api.json');
  let poses = JSON.parse(poseAPI);
  let quote = "I bow down to Lord Patanjali, who gave the science of Yoga to humanity!🙏"
  db.user.findAll()
  .then(users=>{
    res.render('profile/admin', { moment, users, poses , quote: quote})
  })
  .catch(err=>{
    console.log(err)
    res.render('error')
  })

   
  })
  

//Export (allow me to include this in another page)
module.exports = router;
