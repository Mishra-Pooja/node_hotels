
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const person = require('./models/person'); 
const db = require('./db');
//require('dotenv').config();

// const port = process.env.PORT || 3000;
// const databaseUrl = process.env.DATABASE_URL;

// console.log(port); // Output: 3000
// console.log(databaseUrl); // Output: mongodb://localhost:27017/mydb

app.use(bodyParser.json());

// Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();
};
app.use(logRequest);

// Configure Express Session
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true
}));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await person.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordMatch =  await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user); 
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  })
);

// Define Passport serialization and deserialization functions
passport.serializeUser(function(user, done) {
  done(null, user.id); // Serialize the user by storing only the user's ID in the session
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await person.findById(id); 
    done(null, user); 
  } catch(err) {
    done(err, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

const localAuthMiddleware = passport.authenticate('local', { session: true });

app.get('/', localAuthMiddleware, function (req, res) {
  res.send('Welcome To My Hotel...How Can I help You..');
});

// Import and use router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const UserRoutes = require('./routes/UserRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
app.use('/User', UserRoutes);

app.listen(3000, () => {
  console.log('listening on port 3000');
});