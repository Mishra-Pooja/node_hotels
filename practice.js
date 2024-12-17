// console.log("server is running");
// function add(a,b){
//     return a+b;

// }
// let result=add(2,5);
// console.log(result);
// function add(a,b){
//     return a+b;
// }
// let result=add(5,6);
// console.log(result);

// let add=(a,b)=>{return a+b}
// result = add(5,6)
// console.log(resu)
// let add=(a,b)=>a+b;result = add(5,6);console.log(result);
// add=(a,b)=>a+b;result=add(9,8);console.log(result)

// (function(){
//     console.log("i am a pooja ");
// })();
// function printtt(){
//     console.log("i am a pooja ");
// }
// let c1=printtt()
// (function(){
//     console.log("i am a pooja ");
// })();
// function p1(){
//     console.log("i am pooja");
// }
// let add= function(a,b,p1){
//     let res= a+b;
//     console.log(res)
//     p1();
// }
// add(5,6,p1);
// function callback(){
//     console.log("i am a pooja")
// }
// let add = function(a,b,callback){
//     let res=a+b;
//     console.log(res);
//     callback();

// }
// add(5,7,callback);
// let add=(a,b)=>{a+b;
// result=a+b;
// console.log(result)}
// add(5,7);

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', "Hi"+user.username+"\n"+"How are You..?\n what's going on..??", ()=>{
//     console.log("file is created");
// });

// const notes = require('./notes.js');
// var _ =require('lodash')
// console.log("server file is avaolable");


// var age = notes.age;
// var result=notes.addNumber(age+18,20);
// console.log(age);
// console.log("result is now ",+result)

// var data = ["person","person",1,2,3,1,2,"name","age",2];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString("pooja"));

// const objectToConvert ={
//     name:"pooja",
//     age:20
// };

// const json = JSON.stringify(objectToConvert);//convert object to json string
// console.log(json);

// console.log(typeof json) ;
// const jsonString = '{"name":"pooja", "age":20,"city":"new york"}'
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);



//92..58
// app.get('/Rice', (req, res)=> {
//     res.send('Sure sir , I would Love to serve Rice')
//   })
  // app.get('/idli',  (req, res)=> {
  //   var customer_idli ={
  //     name: 'rava idli',
  //     size: '10 cm diameter',
  //     is_sambhar: true,
  //     is_chutney: false
  //   }
  // })-
  /*POst route to add a person*/
  //ab support nhi karta ye callback method newperson.save wala
  //app.post('/person', (req,res)=>{
  //   const data =req.body//Assuming the request body contains the person data 
  //   //create a new person document using the mongoose model
  //   const newperson = new person(data);
  //   /*avoiding lengthi process*/
  //   // newperson.name=data.name;
  //   // newperson.age=data.age;
  //   // newperson.mobile=data.mobile;
  //   // newperson.email=data.email;
  //   // newperson.address=data.address;
  //   /*save the ne person to the database*/
  //   newperson.save((error,savedpersen)=>{
  //     if(error){
  //       console.log('Error saving person1',error);
  //       res.status(500).json((error:'internal servar error'))
  //     }else{
  //       console.log('data saved successfully');
  //       res.status(200).json(savedpersen);
  //     }
  //   })
  // }) 
//92...41


