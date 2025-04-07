import express  from 'express';
import database from '../config/database.js';
import multer from 'multer';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
const upload = multer();
dotenv.config();

const busManagementRouter = express.Router();
busManagementRouter.use(bodyParser.json());
busManagementRouter.use(express.json());
busManagementRouter.use(bodyParser.urlencoded({ extended: true }));


busManagementRouter.get('/getAllBuses',(req,res)=>{
    const sql = 'CALL getAllBuses()';
  
    database.query(sql,(err,result)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:'Error appeared during fetching buses'});
      }
      else {
        return res.status(200).json({buses:result[0]});
      }
    })
  })
  
  busManagementRouter.post('/addNewBus',(req,res)=>{
  
   try {
  
   const busNumber = req.body.NUMERO_BUS;
   const driverFullName =req.body.nomChauffeur;
   const driverPhoneNumber = req.body.telephoneChauffeur;
   const checkBusSql = 'CALL checkBus(?)'
  
   database.query(checkBusSql,[busNumber],(err,checkResult)=>{
    if(err){
      console.log(err);
      return res.status(401).json({message:`Error appeared during checking bus number`});
    }
    else {
      if(checkResult[0].length<=0){
        console.log(`Bus number is available to use`);
        const addBusSql = 'CALL addNewBus(?,?,?)';
  
        
        database.query(addBusSql,[busNumber,driverFullName,driverPhoneNumber],(err,result)=>{
          if(err){
            console.log(err);
            return res.status(401).json({message:`Error appeared during adding a new Bus`});
          }
          else {
            console.log(result);
               if(result[1].affectedRows>0){
                const busId = result[0][0].bus_Id;
                 console.log('Bus was added successfully');
                 return res.status(200).json({busId:busId,message:`Bus was added successfully`});            
               }
               else {
                 console.log(err);
                 return res.status(500).json({error:'There was an error during adding a Bus'}) ;
               }
      
          }
        })
  
      }
      else {
       return res.json({message:'Exist'});
      }
  
    }
   })
  }
   catch(err){
    return res.status(500).json({message:`Server error appeared in operation`});
   }
  
  })
  
  
  busManagementRouter.post('/updateBus',(req,res)=>{
  
   try {
     const oldBusNbr = req.body.oldBusNbr;
     const busId = req.body.bus.ID_BUS;
    const newBusNumber = req.body.bus.NUMERO_BUS;
   const driverFullName =req.body.bus.nomChauffeur;
   const driverPhoneNumber = req.body.bus.telephoneChauffeur;
   const checkBusSql = 'CALL checkNewBusNbr(?,?)';
   
  
   database.query(checkBusSql,[oldBusNbr,newBusNumber],(err,checkResult)=>{
    if(err){
      console.log(err);
      return res.status(401).json({message:`Error appeared during checking bus number`});
    }
    else {
      if(checkResult[0].length<=0){
       
        const sql = 'CALL updateBus(?,?,?,?)';
        database.query(sql,[busId,newBusNumber,driverFullName,driverPhoneNumber],(err,result)=>{
          if(err){
            console.log(err);
            return res.status(500).json({error:'There was an error during updating a Bus'}) ;
          }
          else {
              if(result.affectedRows>0){
                console.log('Bus was updated successfully');
                return res.status(200).json({message:`Bus was updated successfully`});            
              }
              else {
                console.log(err);
                return res.status(500).json({error:'There was an error during updating a Bus'}) ;
              }
          }
        })
  
      }
      else {
          console.log('bus nbr already in use');
       return res.json({message:'Exist'});
      }
  
    }
  })
   }
   catch(err){
    console.log(err);
    return res.status(500).json({error:'There was an error during updating a Bus'}) ;
   }
  
  
  })
  
  
  busManagementRouter.post('/deleteBus',(req,res)=>{
   try {
    
    const sql = 'CALL deleteBus(?)';  
  
     database.query(sql,[req.body.busId],(err,result)=>{
      if(err) {
        console.log(err);
        return res.status(500).json({error:'An error appeared during the bus'});
      }
       else {
          if(result.affectedRows>0){
            console.log('Bus was deleted successfully');
            return res.status(200).json({message:'Bus was deleted successfully'});
          }
          else {
            return res.status(404).json({message:'Bus not found'});
          }
  
       }
    })
  
  
  
   } catch(err){
      console.log(err);
      return res.status(500).json({error:`Operations failed because of server error`});
   }
  
  
  })


export default busManagementRouter;