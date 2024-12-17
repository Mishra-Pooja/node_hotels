// // // const express = require('express');
// // // const router = express.Router();
// // // const user = require('./../models/User');



// // // router.post('/', async(req,res)=>{

// // //     try{
// // //       const data = req.body//assuming the request body contains the person data
// // //       //create a new person document using the mongoose model
// // //       const newuser = new user(data);
// // //       //save the new person to the database
// // //       const response = await newuser.save();
// // //       console.log('data saved');
// // //       res.status(200).json(response);

// // //     }
// // //     catch(err){
// // //       console.log(err);
// // //       res.status(500).json({error:'Internal Server Error'});


// // //     }
// // //   })



// // // const router = require('express').Router();
// // // const User = require('../models/User'); 
// // // const momentTimezone = require('moment-timezone');

// // // router.post('/', async (req, res) => {
// // //   try {
// // //     const { username, email, ...rest } = req.body;

// // //     // Check for duplicate username
// // //     const existingUsername = await User.findOne({ username });
// // //     if (existingUsername) {
// // //       throw new Error('Username Should be unique'); 
// // //     }

// // //     // Check for duplicate email
// // //     const existingEmail = await User.findOne({ email });
// // //     if (existingEmail) {
// // //       throw new Error('Email already exists'); 
// // //     }

// // //     const newUser = new User({ username, email, ...rest }); 
// // //     const response = await newUser.save();
// // //     console.log('User saved successfully');
// // //     res.status(201).json(response); 

// // //   } catch (err) {
// // //     console.error(err);
// // //     let errorMessage = 'Internal Server Error'; 
// // //     if (err.message === 'Username already exists' || err.message === 'Email already exists') {
// // //       errorMessage = err.message; 
// // //     }
// // //     res.status(500).json({ error: errorMessage }); 
// // //   }
// // // });



// // //const express = require('express');
// // //const momentTimezone = require('moment-timezone');

// // //const app = express();
// // //const port = 3000;

// // // app.use(express.json());

// // // router.post('/', (req, res) => {
// // //   const { dob, timezone } = req.body;

// // //   // DOB को Date ऑब्जेक्ट में परिवर्तित करें
// // //   const dobDate = new Date(dob);

// // //   // स्थानीय समय क्षेत्र में परिवर्तित करें
// // //   const localDateTime = momentTimezone.tz(dobDate, timezone);

// // //   // UTC समय में परिवर्तित करें
// // //   const utcDateTime = localDateTime.utc();

// // //   // डेटाबेस में संग्रहीत करें (उदाहरण के लिए, MongoDB का उपयोग करके):
// // //   // ... (यहां आप अपने डेटाबेस के अनुसार कोड लिखेंगे)

// // //   res.send('DOB submitted successfully');
// // // });

// // // app.listen(port, () => {
// // //   console.log(`Server listening on port ${port}`);
// // // });

// // // module.exports = router;









// // // const express = require('express');
// // // const momentTimezone = require('moment-timezone');
// // // const User = require('../models/User'); // Assuming your User model is in models/User.js

// // // const app = express();
// // // const port = 3000;
// // const express = require('express');
// // const router = express.Router();
// // const User = require('./../models/User');
// // const momentTimezone = require('moment-timezone');





// // // User Registration Route
// // router.post('/', async (req, res) => {
// //   try {
// //     const { username, email, dob, timezone, ...rest } = req.body;

// //     // Check for duplicate username
// //     const existingUsername = await User.findOne({ username });
// //     if (existingUsername) {
// //       throw new Error('Username Should be unique');
// //     }

// //     // Check for duplicate email
// //     const existingEmail = await User.findOne({ email });
// //     if (existingEmail) {
// //       throw new Error('Email already exists');
// //     }

// //     // Convert DOB to UTC
// //     const dobDate = new Date(dob);
// //     const localDateTime = momentTimezone.tz(dobDate, timezone);
// //     const utcDateTime = localDateTime.utc();

// //     // Create new User with UTC DOB
// //     const newUser = new User({ username, email, dob: utcDateTime, ...rest }); 
// //     const response = await newUser.save();
// //     console.log('User saved successfully');
// //     res.status(201).json(response); 

// //   } catch (err) {
// //     console.error(err);
// //     let errorMessage = 'Internal Server Error';
// //     if (err.message === 'Username already exists' || err.message === 'Email already exists') {
// //       errorMessage = err.message;
// //     }
// //     res.status(500).json({ error: errorMessage });
// //   }
// // });

// // // Export the router for use in your main application file
// // module.exports = router;






const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const momentTimezone = require('moment-timezone');

// Regular Expressions for Validations
const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only alphanumeric and underscores
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, one lowercase, one uppercase, one digit, one special character

// User Registration Route
router.post('/', async (req, res) => {
  try {
    const { username, email, dob, timezone, password, ...rest } = req.body;

    // Username Validations
    if (!username || !usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Invalid username. Only alphanumeric and underscores allowed.' });
    }

    // Email Validation
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Password Validation
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one digit, and one special character.' });
    }

    // Check for duplicate username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    //DOB Validation
    const today = new Date();
    const dobDate = new Date(dateofbirth);

    if (dobDate >= today) {
      return res.status(400).json({ error: 'Date of Birth cannot be in the future.' });
    }

    // Calculate age
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18) {
      return res.status(400).json({ error: 'You must be at least 18 years old.' });
    }

    // Convert DOB to UTC
    const localDateTime = momentTimezone.tz(dobDate, timezone);
    const utcDateTime = localDateTime.utc();

    // Create new User with UTC DOB
    const newUser = new User({ username, email, dob: utcDateTime, password, ...rest }); 
    const response = await newUser.save();
    console.log('User saved successfully');
    res.status(201).json(response); 

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router for use in your main application file
module.exports = router;
