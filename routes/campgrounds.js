var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
const user = require("../models/user");
var passport        = require("passport");

//INDEX
router.get("/", function(req,res){
    res.redirect("/campgrounds")
});

router.get("/campgrounds", function(req,res){
    console.log(req.user); 
    Campground.find({},function(err,allcampgrounds){
       if(err){
           console.log(err)
       } else{
         res.render("index", {campgrounds: allcampgrounds});
       }
    })
});
//CREATE
router.post("/campgrounds", function(req,res){
    //get data from form
    var name = req.body.campground;
    var url = req.body.url;
    var synopsis = req.body.description;
    var newCampground = {name: name, image: url, description: synopsis};
    Campground.create(newCampground, function(err,campground){
        if(err){
            console.log(err)
        } else{
             //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    })  
});
//NEW
router.get("/campgrounds/new", function(req,res){
    res.render("addcampgrounds");
})
//SHOW
router.get("/campgrounds/:id",function(req,res){
    //find the campground with the selected ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,description){
        if(err){
            console.log(err);
        }else{
            res.render("show", {description: description})
        };
    })
})

module.exports = router;