import express from 'express';
import database from '../config/database.js'
const universitySectionRouter = express.Router();



universitySectionRouter.get('/getUniversitySections',(req,res)=>{
    try {
      const sql = 'CALL getUniversitySections()';
  
      database.query(sql,(err,universitySections)=>{
  
        if(err){
          console.log(err);
          return res.status(500).json({error:'There was a servor error with the server'});
        }
        else{
          
          return res.status(200).json({universitySections:universitySections[0]});
        }
      });
    }
    catch(err){
      console.log(err);
      return res.status(500).json({error:'There was a servor error during fetching university sections'})
    }
  })

  universitySectionRouter.post('/addUniversitySection',(req,res)=>{
    try {

      const univSectionName = req.body.name;
      const sql = 'CALL addUnivSection(?)';

      database.query(sql,[univSectionName],(err,result)=>{
        if(err){
          console.log(err);
          return res.status(400).json({error:`Operation failed because of server error`});
        }
        else {
          if(result[1].affectedRows>0){
           console.log('new university was added successfully');
           return res.status(200).json({newUnivId:result[0][0].newUnivId,message:"new univ was added successfully"});
          }
          else {
            console.log('new university was not added successfully');
            return res.status(400).json({error:`New university was not added successfully`});
          }
        }
      })

    }
    catch (err){
      console.log(err);
      return res.status(500).json({error:err});
    }
  })

  universitySectionRouter.post('/updateUniversitySection',(req,res)=>{
    try {

      const univId = req.body.id;
      const univName = req.body.name;
      const sql = 'CALL updateUniversitySection(?,?)';

      database.query(sql,[univId,univName],(err,result)=>{
        if(err){
          console.log(err);
          return res.status(400).json({error:err});
        }
        else {
          
          if(result.affectedRows>0){

            console.log('university section was updated successfully');
            return res.status(200).json({message:'university was updated with success'});
          }

        }
      })

    }
     catch(err){
      console.log(err);
      return res.status(500).json({error:err});
     }
  })

  universitySectionRouter.post('/deleteUniversitySection',(req,res)=>{
    try {
      
      const univId = req.body.universityId;
        
      const sql = 'CALL deleteUniversitySection(?)';

      database.query(sql,[univId],(err,result)=>{
        if(err){
          console.log(err);
          return res.status(400).json({error:err});
        }
        else {
          if(result.affectedRows>0){
            console.log('university section was deleted successfully');
            return res.status(200).json({message:'university was deleted with success'});
          }
          else {
            console.log('university section was not deleted successfully');
            return res.status(400).json({error:'university was not deleted with success'});
          }
        }
      })
     

    }
     catch(err){
      console.log(err);
      return res.status(500).json({error:err})
     }
  })

  export default universitySectionRouter;