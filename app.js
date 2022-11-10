const express = require('express');
require('dotenv').config();
const sessions = require('express-session');
const morgan = require('morgan')
const path = require('path')
const app = express();
const cors=require('cors');
const jwt = require('jsonwebtoken');

// app.use(sessions({
//     secret: process.env.ORG_CODE,
//     saveUninitialized:true,
//    // cookie:{},
//     resave: false
// }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public")); 
// app.use(morgan('combined'))

///////////////////////////////////////////////////////////////////////////////
//                          require local files                              //
///////////////////////////////////////////////////////////////////////////////

require("./config/db");
const jsonApis= require('./routes/api.routes');
const adminApi= require('./routes/admin.api.router');
const { Card } = require('./modle/api.modle.schema');
const multer = require('multer');

///////////////////////////////////////////////////////////////////////////////
//                          app.use local files                              //
///////////////////////////////////////////////////////////////////////////////
app.use('/api/admin',adminApi)
app.use('/api',jsonApis)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
    // res.send("hello")
  });



//---------------route not found error-----------------------
app.use((req,res,next)=>{
    res.status(500).json({message:"route not found"});      
});
//-----------------server error----------------------
app.use((err,req,res,next)=>{
    if (err) {
        if (err instanceof multer.MulterError) {
            console.log(err)
            next()
        } else {
            console.log(err);
            res.status(599).json({message:err.message,status:false}); 
        }
    } else {
        res.send({
            message:'...',
            status:false
        })
    }     
});



module.exports=app;