const express = require('express');
const router = express.Router();
const login = require('./../models/login');


//post route to add a login 
router.post('/', async(req,res)=>{
    try{
      const data = req.body//assuming the request body contains the person data
      //create a new person document using the mongoose model
      const newlogin = new login(data);
      //save the new person to the database
      const response = await newlogin.save();
      console.log('data saved');
      res.status(200).json(response);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});


    }
  })
  module.exports=router;

