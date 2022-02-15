var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//New Comment
router.get("/campgrounds/:id/comment/new",isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else{
            res.render("comment",{campground: campground});
        }
    });
    
})

//Create new comment
router.post("/campgrounds/:id/comment",isLoggedIn, function(req, res){
        //Lookup campground with ID
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                console.log(err);
            } else{
                 //Add a new comment to Campground.comments
                console.log(req.body.post)
                Comment.create(req.body.post, function(err, comment){
                //Add the comment to the specific campground
                campground.comments.push(comment);
                campground.save();
                //Redirect to show page
                res.redirect("/campgrounds/" +req.params.id)
            })
        }                 
    })
})


//MIDDLEWARE FOR AUTHENTICATION
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login")
}

module.exports = router;