//jshint esversion:6
const express = require('express')
const bodyparser = require('body-parser')
const request= require('request')
const https = require('https')

const app=express();

app.use(express.static("public"))

app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html')
})

app.post('/abc',function(req,res){
   const fname=req.body.firstname
   const lname=req.body.lastname
   const email=req.body.emailid
   console.log(fname,lname,email)

   const data={
       members:
       [
           {
             email_address : email,
             status:"subscribed",
             merge_fields:{
                 FNAME: fname,
                 LNAME: lname
             }

           }
       ]
   };

   const jsonData = JSON.stringify(data);

   // url to connect with the service and list id of the service ur using 
   const url = ""
  

  const Options = {
      method : "POST",
      // API key of the mailing service used
      auth: ""
  }

   const request = https.request(url , Options , function(response){

    if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }

       response.on('data',function(data){
           console.log(JSON.parse(data))
       })
   })
     request.write(jsonData)
     request.end();

})

app.post('/failure',function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server held")
})


