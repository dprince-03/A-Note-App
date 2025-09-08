const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require('../models/user.models');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, /** cb */ done) {
    console.log(profile);
    
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });

    const newUser = {
      googleID: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      profileImage: profile.photos[0].value,
      emailVerified: profile.emails[0].verified,
    };
    try {
      let user = await User.findOne( { googleID: profile.id } );

      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser);
        done(null, user);
      }

    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
));

// persist user data in session after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id); 
});

// Retrieve user data from session
passport.deserializeUser( async(id, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });

  try {
		const user = await User.findById(id);
		done(null, user);
    
	} catch (error) {
		done(error, null);
	}
});

module.exports = passport;