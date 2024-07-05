// Call of epxress module
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

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

module.exports = router;