const express =require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


 
//post route to add menuitem
router.post('/', async(req,res)=>{
  try{
    const data = req.body//assuming the request body contains the person data
    //create a new person document using the mongoose model
    const newMenu = new MenuItem(data);
    //save the new person to the database
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});


  }
})



//Get method to get the menuitem
router.get('/', async(req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  
  }
  })



  // //paramiterized url for taste
  // router.get('/:tastetype', async(req,res)=>{
  //   try{
  //     const tastetype = req.params.taste;//Extract the taste from the url parameter
  //     if(tastetype=='sour' || taste=='spicy' || taste=='sweet' ){
  //       const response = await menu.find({taste:tastetype});
  //       console.log("response fatched");
  //       res.status(200).json(response);

  //     }else{
  //       res.status(404).json({error:'invalid taste type'});
  //     }
        


  //   }catch(err){
  //     console.log(err);
  //     res.status(500).json({error:'internal server error'});

  //   }

  // })
  router.get('/:tasteType',async(req,res)=>{
    try{
      const tasteType =req.params.tasteType;////Extract the work type from the url parameter
      if(tasteType == 'sweet'|| tasteType == 'sour'||tasteType == 'spicy'){
        const response = await MenuItem.find({taste:tasteType});
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


