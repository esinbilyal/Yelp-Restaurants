const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const authController = require('../controllers/authController');
const passport = require('passport');

router.route('/register')
    .get(authController.renderRegister)
    .post(catchAsync(authController.register));

router.route('/login')
    .get(authController.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), authController.login);

router.get('/logout', authController.logout);

// router.get('/register', authController.renderRegister);
// router.post('/register', catchAsync(authController.register));
// router.get('/login', authController.renderLogin);
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), authController.login);

module.exports = router; 