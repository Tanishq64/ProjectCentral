require('dotenv').config()
const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/auth/google/callback",
        passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
        done(null, user.id);
});

passport.deserializeUser(function(user, done) {
        console.log("dser")
        done(null, user);
});