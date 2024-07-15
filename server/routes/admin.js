// Call of epxress module
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
// Encrypt PWD in DB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

/**
 * 
 * Check - Login
*/
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message : 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId =decoded.userId
        next();
    } catch(error){
        res.status(401).json({ message:'Unauthorized'});
    }
}

/**
 * GET /
 * Admin - Login Page
*/

// Basic router
router.get('/admin', async(req, res) => {
    try{
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
    
        res.render('admin/index',{locals,layout:adminLayout});
    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
});

/**
 * GET /
 * Admin - Check Login
*/

router.post('/admin', async(req, res) => {
    try{

        const { username,password } = req.body;
        // Using cookiens for still login
        // Find user
        const user = await User.findOne({ username });

        // Error if user not find
        if(!user){
            return res.status(401).json({ messagae : 'Invalid credentials'});            
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        // Passwor not valid
        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token',token,{ httpOnly:true});

        res.redirect('/dashboard');

    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
});


/**
 * GET /
 * Dashboard
*/

router.get('/dashboard', authMiddleware,async(req, res) => {
    res.render('admin/dashboard');


});
    


/**
 * GET /
 * Admin - Register
*/

router.post('/register', async(req, res) => {
    try{

        const { username,password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        try{
            //Pass the hash password
            const user = await User.create({username,password:hashedPassword});
            res.status(201).json({message : 'User Created',user});
        // Error Handeling    
        } catch ( error) {
            if(error.code === 11000){
                res.status(409).json({message :'Uer already in use'});
            }
            res.status(500).json({message: 'Internal Server error'})
        }
        
    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
});

module.exports = router;


        // if(req.body.username === 'admin' && req.body.password == 'password'){
        //     res.send('You are logged in')
        // }else{
        //     res.send('Wrong username or password')
        // }
        // console.log(req.body);

        // res.redirect('/admin');