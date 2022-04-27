const express = require('express');
const router = express.Router();
const home = require('../data/home');

router.get('/', async (req, res) => {
    let topProfessors = await home.getTop3Professors();
    let topCourses = await home.getTop5Courses();
    res.render('home', 
                { 
                    title: 'RateMyCourses - Home',
                    topProfessors: topProfessors,
                    topCourses: topCourses,
                    partial: ""
                }
    );
});


module.exports = router;
