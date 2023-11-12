require('dotenv').config()
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./passport');

const app = express()
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// const loginAndRedirectBack = (req, res, next) => {
//     if (req.user){
//         next();
//     } else {
//         console.log(req.originalUrl)
//         req.session.returnTo = req.originalUrl;
//         res.redirect("/login");
//     }
// }

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Base route
app.get("/home", (req, res) => {
    res.send("Home Page")
})

// Google Auth consent screen route
app.get('/login',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }
    ));

// app.get('/account/create', loginAndRedirectBack,
//     function (req, res) {
//         console.log(req.user)
//         console.log(req.body)
//         res.redirect('/success')
//     }
// )

// Call back route

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
        successRedirect: '/success'
    }),
    function (req, res) {
        console.log(req.session.returnTo)
    }
);

// failed route if the authentication fails
app.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})

// Success route if the authentication is successful
app.get("/success", isLoggedIn, (req, res) => {
    console.log('You are logged in');
    res.send(`Welcome ${req.user.displayName}`)
})

// Route that logs out the authenticated user  
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session:', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                res.redirect('/home');
            });
        }
    });
});

app.get("/", (req, res) => {
    res.send("hello!");
})

app.listen(process.env.SERVER_PORT)