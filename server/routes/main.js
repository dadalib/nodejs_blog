// Call of epxress module
const express =  require('express');
const router = express.Router();

// Routes
router.get('',(req,res) => {
    res.send("Hello World");
});

// Export router
module.exports = router;
