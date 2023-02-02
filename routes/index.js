var express = require('express')
var router = express.Router()
var User = require('../models/user')
var movie = require('../models/movielist')
var ticket = require('../models/ticket')
var mongoose = require('mongoose');
var movieList = require('../models/movielist')


router.get('/', (req,res) =>{
    res.redirect('/register')
})

router.get('/register',(req,res)=> {
    res.render('register.ejs')
})

router.post('/register',(req,res)=>{
try{
    const newUser = User({
        name:req.body.nameRegister,
        email:req.body.emailRegister,
        password: req.body.passwordRegister
    })
    newUser.save()
    console.log("Success")
    res.redirect('/login')
}
catch(err){
    res.redirect('/register')
}

})

router.get('/login', (req,res)=>{
res.render('login.ejs')
})


router.post('/login', (req,res) =>{
    User.findOne({email:req.body.email,password:req.body.password}, function(err,data){
    if(data){
        console.log(data)
        res.redirect('/homepage')
    }else console.log("err user")
    })
})


router.get('/homepage', (req,res) => {
movie.find({},function(err,data){
    if(data) {
        res.render('Homepage.ejs',{data})
    }
    })
})

router.post('/ticket', (req,res) =>{
    movieList.findOne({title:req.body.insertTitle}, function(err,data){
        if(data){
            console.log("jumpa")
            res.render('movie.ejs',{data})
        }else console.log("err")
    })
        
})

router.post('/confirmation', async(req,res) => {
    var bil = req.body.count
    var price = req.body.submitPrice
    var Total = bil * price
    console.log(bil)
    console.log(req.body.submitTitle)

    var data = new ticket({
        title: req.body.submitTitle,
        time: req.body.time,
        count: req.body.count,
        total: Total,
        poster: req.body.submitPoster
    })


    try{
        // const data = await Ticket.save()
        res.render('confirmation.ejs',{data})
    }catch(err){
        res.status(400).json({message:err.message})
    }
    
})

router.post('/accept',async(req,res)=>{
    var data = new ticket({
        title: req.body.confirmTitle,
        time: req.body.confirmTime,
        count: req.body.confirmCount,
        total: req.body.confirmTotal,
        poster: req.body.confirmTitle
    })

    try{
        const Ticket = await data.save()
        console.log(Ticket)
        res.render('thank-you.ejs')
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = router