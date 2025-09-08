const express = require('express');
const authRouter = express.Router();
const passport = require('../controllers/auth.controllers');

/**
 * @route GET /auth/google
 * @desc Google OAuth Route
 * @access Public
 */
authRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Callback route for Google to redirect to
authRouter.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/login',
        successRedirect: '/dashboard',
    }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
);

// route if somthing went wrong
authRouter.get('/login-failure', (req, res) => {
    res.send('Login Failed, something went wrong!');
});

// Logout Route
// destroy user session
authRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            res.status(500).send('Error logging out');
            
        } else {
            res.clearCookie('connect.sid', { path: '/' }); // clear the session cookie
            res.redirect('/'); // redirect to homepage or login page after logout
        }
    });
});

module.exports = authRouter;