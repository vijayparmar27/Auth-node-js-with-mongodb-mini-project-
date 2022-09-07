const express = require('express');
const routerController = require('../controllers/routes');
const authController=require('../controllers/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.hbs',{
    });

});

router.get('/register', (req, res) => {
    res.render('register.hbs');

});

router.get('/login', (req, res) => {
    res.render('login.hbs');

});

router.get('/data_page',authController.isLoggedIn,routerController.data_page);


router.get('/add',authController.isLoggedIn, routerController.add);

router.get('/edit/:userId',authController.isLoggedIn, routerController.edit);

router.get('/delete/:userId',authController.isLoggedIn, routerController.delete);

module.exports = router;