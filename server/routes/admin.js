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
 * Admin Dashboard
*/

router.get('/dashboard', authMiddleware,async(req, res) => {
    try{
        const locals = {
            title:'Dashboard',
            description:'Simple Blog created with NodeJs, Express & MongoDB.'
        }

        const data = await Post.find();
        res.render('admin/dashboard',{
            locals,
            layout:adminLayout,
            data
        });

    }catch(error){
        console.log(error);
    }


});
    

/**
 * GET /
 * Admin - Create New Post
*/

router.get('/add-post', authMiddleware,async(req, res) => {
    try{
        const locals = {
            title:'Add Post',
            description:'Simple Blog created with NodeJs, Express & MongoDB.'
        }

        const data = await Post.find();
        res.render('admin/add-post',{
            locals,
            layout:adminLayout

        });

    }catch(error){
        console.log(error);
    }


});

/**
 * Post /
 * Admin - Create New Post
*/

router.post('/add-post', authMiddleware,async(req, res) => {
    try{


        try{
            const newPost = new Post({
                title: req.body.title,
                body:req.body.body
            });
            await Post.create(newPost),
            res.redirect('/dashboard');

        }catch(error){
            console.log(error);
        }

        res.redirect('/dashboard');

    }catch(error){
        console.log(error);
    }
});




module.exports = router;


        // if(req.body.username === 'admin' && req.body.password == 'password'){
        //     res.send('You are logged in')
        // }else{
        //     res.send('Wrong username or password')
        // }
        // console.log(req.body);

        // res.redirect('/admin');