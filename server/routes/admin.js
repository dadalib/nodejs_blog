// Call of epxress module
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
// Encrypt PWD in DB
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = '../views/layouts/admin';

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
        if(req.body.username === 'admin' && req.body.password == 'password'){
            res.send('You are logged in')
        }else{
            res.send('Wrong username or password')
        }
        console.log(req.body);

        res.redirect('/admin');
    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
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