// Call of epxress module
const express =  require('express');
const router = express.Router();

// Routes
// Pass data
router.get('',(req,res) => {
    const locals = {
        title : "NodeJs Blog",
        description:"Simple Blog created with NodeJs, Express & MongoDb."
    }
    
    res.render('index',{ locals });
});

router.get('/about',(req,res) => {
    res.render('about');
});

router.get('/contact',(req,res)=>{
    res.render('contact');
});
// Export router
module.exports = router;
