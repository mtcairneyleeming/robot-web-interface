

import * as express from 'express' ;
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('pages/status');
        //console.log("Status (/)")
    })
    .get('/control', function(req, res, next) {
        res.render('pages/control', { title: 'Control', header: "Robot Control", description: "Use this webpage or a ps3 controller to control the robot" });
    })
    .get('/settings/robot', function(req, res, next) {
        res.render('pages/rsettings', { title: 'Robot Settings', header: "Robot Settings", description: "Change settings for the robot (WIP)" });
    })
    .get('/settings/console', function(req, res, next) {
        res.render('pages/csettings', { title: 'Console Settings', header: "Console Settings", description: "Change settings for the web console (WIP)" });
    })
    .get('/search', function(req, res, next) {
        res.render('pages/search', { title: 'Search' });
    })
    .get('/mic', function(req, res, next) {
        res.render('pages/mic');
    })
    .get('*', function(req, res) {
        //console.log('404ing');
        res.render('pages/error');
    });


export = router;