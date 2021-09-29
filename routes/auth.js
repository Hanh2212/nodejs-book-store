const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
    body('password', 'Password at least 5 characters').isLength({min: 5}).isAlphanumeric().trim()
], authController.postLogin);

router.post('/signup',[check('email').isEmail()
        .withMessage('Please enter a valid email!').custom((value, {req}) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email has exists already');
                    }
                });
        }).normalizeEmail(),
        body('password', 'Enter at least 6 characters').isLength({min: 6}).isAlphanumeric().trim(),
        body('confirmPassword').trim().custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password not matched');
            }
            return true;
        })
    ], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

module.exports = router;