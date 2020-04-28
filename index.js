/*******************************************
 * NODE-MODULES
 ******************************************/
// Add in environment
 require('dotenv').config()
// Require needed modules
let express = require('express')
let flash= require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

// creata an app instance
let app = express()

// Include passport(via the passport config file)
let passport = require('./config/passportConfig')
/*******************************************
 * SETTINGS/MIDDLEWARE
 ******************************************/

// set template language to ejs
app.set('view engine','ejs')
//Tell express to use the layout modules
app.use(layouts)
// Set up static folder with 
app.use(express.static('static'))

// Decrypt variables coming in via POST routes from forms
app.use(express.urlencoded({extended:false}))

//set up sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//set up connect-flash for the flash alert messages
//it depends on session, order matters so session has to be declared first
// before flash is used
app.use(flash())

//Pasport needs to come after session, dependency on session
app.use(passport.initialize())
app.use(passport.session())

//custom middleware which makes certain variables
// available to EJS pages through locals
app.use((req,res,next)=>{
    res.locals.alerts = req.flash()
    res.locals.user = req.user //load user from session on every single page
    next() // telling the middleware to run the next function
})

/*******************************************
 * ROUTES
 ******************************************/
//Controllers
app.use('/auth',require('./controllers/auth'))
app.use('/profile',require('./controllers/profile'))
app.use('/class',require('./controllers/class'))

// create a home page
app.get('/',(req,res)=>{
    res.render('home')
})

 // create a wildcard route
app.get('*',(req,res)=>{
    //res.send("This matches literally anything, great spot for an error page")
    res.render('error');
})

/*******************************************
 * LISTEN
 ******************************************/
app.listen(3000)