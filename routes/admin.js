var express = require('express')
var router = express.Router()
var UserAdmin = require('../models/adminModel')
var movie = require('../models/movielist')
var ticket = require('../models/ticket')
var mongoose = require('mongoose');
var user = require('../models/user')
const movieList = require('../models/movielist')

router.get('/',(req,res)=>{
    res.render('adminLogin.ejs')
})

router.post('/adminLogin',(req,res)=>{
    UserAdmin.findOne({
        emailAdmin:req.body.emailAdmin,
        passwordAdmin:req.body.passwordAdmin
    },
        function(err,data){
        if(data){
            res.redirect('./adminIndex')
        }else res.send({message:"admin fail"})
    })

})
    
router.get('/adminIndex',(req,res)=>{
    res.render('adminIndex.ejs')
})

router.get('/adminLogout',(req,res) => {
    res.redirect('/')
})

router.get('/userList',(req,res)=>{
    user.find({},function(err,data){
        if(data) res.render('lists/userlist.ejs',{data})
    })
    
})

router.get('/movieList',(req,res)=>{
    movie.find({},function(err,data){
        if(data)res.render('lists/movielist.ejs',{data})
    })
    
})

//get all
router.get('/allMovie',async(req,res)=>{
    try{
        const Movie = await movie.find()
        res.json(Movie)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//get one
router.get('/view/:id',getMovie,(req,res) => {
    res.send(res.Movie)
})


//create one
router.get('/addMovie',(req,res)=>{
    res.render('./lists/addMovie.ejs')
})

router.post('/newMovie' , async(req,res)=>{

    const Movie = new movie({
        title:req.body.newTitle,
        time: req.body.newTime,
        genre: req.body.newGenre,
        poster:req.body.linkPoster
    })

    try{
        const newMovie = await Movie.save()
        res.redirect('./movieList')
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//updating one
router.patch('/updateMovie',(req,res)=>{

})

//delete one
router.get('/deleteMovie/:id',async (req,res)=>{
    const movies = await movie.findByIdAndDelete(req.params.id)
    if(movies){
        movieList.remove(movies)
        res.redirect('../movieList')
    } 
    
})

router.get('/deleteUser/:id',async (req,res)=>{
    const User = await user.findByIdAndDelete(req.params.id)
    if(User){
        movieList.remove(User)
        res.redirect('../userList')
    } 
    
})

async function getMovie(req,res,next){
    try{
        movie = await movie.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({message:"Cannot fimd movie"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.Movie = Movie
    next()
}

module.exports = router