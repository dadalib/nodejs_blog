// Call of epxress module
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
// Routes
// Pass data
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 5;
        let page = req.query.page || 1;

        // Post Page to the oldest in the top
        const data = await Post.aggregate([{ $sort : { createdAt: -1}}])
        .skip(perPage*page-perPage)
        .limit(perPage)
        .exec();

        // Blog post count
        const count =await Post.countDocuments();
        const nextPage = parseInt(page) +1;
        const hasNexPage = nextPage <= Math.ceil(count /perPage);

        // Render Data
        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNexPage ? nextPage : null 
         });

        // Pass Page



        // const data = await Post.find();
        // res.render('index', { locals, data });
    } catch (error) {
        console.log(error);
    }

    // res.render('index', { locals });
});

// router.get('', async(req, res) => {
//     const locals = {
//         title: "NodeJs Blog",
//         description: "Simple Blog created with NodeJs, Express & MongoDb."
//     }

//     try{
//         const data = await Post.find();
//         res.render('index',{locals,data});
//     }catch(error){
//         console.log(error);
//     }

//     // res.render('index', { locals });
// });

// Insert example Mongo data

/**
 * GET /
 * Post : id
*/

router.get('/post/:id', async(req, res) => {
   try{
        let slug = req.params.id;

        const data = await Post.findById({_id: slug});

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('post',{locals,data});
    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
});

/**
 * POST /
 * Post searchTerm
*/
router.post('/search', async(req, res) => {
    try{
        const locals = {
            title: "Search",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }


        let searchTerm = req.body.searchTerm;
        console.log(searchTerm)

    
        // const data = await Post.find();
        res.send('searchTearm');
    }catch(error){
        console.log(error);
    }

    // res.render('index', { locals });
});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
    res.render('about');
});

/**
 * GET /
 * Contact
*/

router.get('/contact', (req, res) => {
    res.render('contact');
});
// Export router
module.exports = router;

// Example to connect to DB on Mongo and set some data

// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body:"This is the body text"

//         },
//         {
//             title: "Deployment of Node.js applications",
//             body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//         },
//         {
//             title: "Authentication and Authorization in Node.js",
//             body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//         },
//         {
//             title: "Understand how to work with MongoDB and Mongoose",
//             body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//         },
//         {
//             title: "build real-time, event-driven applications in Node.js",
//             body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//         },
//         {
//             title: "Discover how to use Express.js",
//             body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//         },
//         {
//             title: "Asynchronous Programming with Node.js",
//             body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//         },
//         {
//             title: "Learn the basics of Node.js and its architecture",
//             body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//         },
//         {
//             title: "NodeJs Limiting Network Traffic",
//             body: "Learn how to limit netowrk traffic."
//         },
//         {
//             title: "Learn Morgan - HTTP Request logger for NodeJs",
//             body: "Learn Morgan."
//         },

//     ])
// }

// insertPostData();