import express from 'express';
import database from '../config/database.js'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();
const router = express.Router();


router.post('/checkEmail',(req,res)=>{

  const {email} = req.body;
 
  const sql = 'CALL SelectingAdminEmail(?)';

  database.query(sql,[email],(err,result)=>{
    if(err){
      console.log(err);
      return err;
    }
    else {
    
      console.log('check Email = '+result[0])
      if(result[0].length>0){
        return res.json({answer:'yes'})
      }
      else {
        return res.json({answer:'no'})
      }
    }
  })

}) 


router.post('/logincheck',async (req,res)=>{
  try{
  
   const Username = req.body.Username;
   const Password = req.body.Password;
    let sql = 'CALL SelectingPassword(?)';
 
    database.query(sql,[Username],async(err,result)=>{
      if(err){
        console.log(err);
        return;
      }
      if(result[0].length<=0){
         return res.status(404).json({answer:0});
      }

          const dbPass = result[0][0].admin_password;
           const isMatch = await bcrypt.compare(Password,dbPass);

           if(!isMatch) {
            return res.status(401).json({answer:-1});
           }
          
           const token = jwt.sign({id: result[0][0].admin_username},process.env.JWT_SECRET,{expiresIn:'3h'})
           return res.status(201).json({answer:1,token:token});
    })

 }
 catch(err){
   console.log(err);
   res.status(500).json({message:err});
 }
 })
 

 const verifyToken = async(req,res,next) =>{
     try {

      const token = req.headers['authorization'].split(' ')[1];
      if(!token) {
        return res.status(403).json({message:"No token provided"});
      }

      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      console.log(decoded);
      req.userId = decoded.id;
      next();
     } catch(err){
      return res.status(500).json({message:"Server error"})
     }
 }

 router.get('/home',verifyToken, async (req,res)=>{
    try {

      const sql = 'CALL GetAdminCredentials(?)';
      database.query(sql,[req.userId],(err,result)=>{
        if(err){
          console.log(err);
          return res.status(500).json({message:'Server error'});
        }
        if(result.length===0){
          return res.status(404).json({message:'User not found'});
        }

        return res.status(201).json({account:result[0][0]});

      })


    } catch(err){
      console.log(err);
      return res.status(500).json({message:'Server error'});
    }

 })

export default router;
