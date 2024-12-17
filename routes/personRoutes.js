require('dotenv').config()
console.log(process.env) 

const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtauthmiddleware,generatetoken} = require('./../jwt');


//post route to add a person 
router.post('/signup', async(req,res)=>{
    try{
      const data = req.body//assuming the request body contains the person data
      //create a new person document using the mongoose model
      const newperson = new person(data);
      //save the new person to the database
      const response = await newperson.save();
      console.log('data saved');

      const payload ={
        id: response.id,
        username: response.username

      }
      console.log(JSON.stringify(payload));
      
      const token = generatetoken(payload);
      console.log("token is :", token);

      res.status(200).json({response: response, token: token});

    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});


    }
  })

  //login route
  router.post('/login', async(req,res)=>{
    try{
      //Extract username and password from request body
      const {username, password}=req.body;

      //find the user by username
      const user = await person.findOne({username: username});

      //is user does not exits or password doesmnot match ,return error
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or pawsword'});
      }

      //generate token
      const payload={
        id: user.id,
        username: user.username
      }
      const token = generatetoken(payload);

      //return token as response
      res.json({token})

    }catch(err){
      console.error(err);
      res.status(500).json({error:' Internal server error'});


    }
  })

  //profile route
   
  router.get('/profile', jwtauthmiddleware, async (req,res)=>{
    try{
      //Extract user id from decoded token
      const userId = req.user.id;

      //find the user by id
      const user = await person.findById(userId);

      //if user does not exits , return error
      if(!user){
        return res.status(404).json({error: 'user not found'});

      }
      //send user profile as JSON response
      res.json(user);
       

    }catch(err){
      console.error(err);
      res.status(500).json({error: 'Internal server eror'});

    }
  })





  //Get method to get the person
  router.get('/',jwtauthmiddleware, async(req,res)=>{
    try{
      const data = await person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server Error'});
  
    }
  })

  //update person
  router.put('/:id',async (req,res)=>{
    try{
      const personId = req.params.id; //Extract the id from the URL parameter
      const updatedPersonData = req.body; // updated data for thr person
      const response = await person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose Validation 
      })
      if (!response){
        return res.status(404).json({error: 'person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);

    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});


    }
  })

  //Delete person
  router.delete('/:id',async(req,res)=>{
    try{
      const personId = req.params.id; //Extract the person's ID from the URL parameter


      //Assuming you have a person model
      const response = await person.findByIdAndDelete(personId);
      if (!response){
        return res.status(404).json({error: 'person not found'});
      }
      console.log('data delete');
      res.status(200).json({message: 'person deleted Successfully'});



    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
      

    }

  })

  


  
//paramiterized url for worktype
router.get('/:workType',async(req,res)=>{
    try{
      const workType =req.params.workType;////Extract the work type from the url parameter
      if(workType == 'chef'|| workType == 'manager'||workType == 'waiter'){
        const response = await person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid work type'});
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
  
    }
  })
  module.exports=router;
  
  