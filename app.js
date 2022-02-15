var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose");
    bodyParser            = require("body-parser");
    Campground            = require("./models/campground")
    seedDB                = require("./seeds"),
    Comment               = require("./models/comment")
    User                  = require("./models/user")
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    http                  = require("http")

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

mongoose.connect("mongodb://127.0.0.1/yem_camp");

//PASSPORT CONFIGURATION
app.use(require("express-session")({  //Require and execute express-session
    secret: "AUTHENTICATION SERVICE",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


//Responsible from reading, encoding and unencoding sessions
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
app.listen("4000", function(){
    console.log("Yelpcamp server is running")
})
