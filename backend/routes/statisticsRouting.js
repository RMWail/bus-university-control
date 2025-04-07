import express  from 'express';
import database from '../config/database.js';
import multer from 'multer';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
const upload = multer();
dotenv.config();

const statisticsRouter = express.Router();
statisticsRouter.use(bodyParser.json());
statisticsRouter.use(express.json());
statisticsRouter.use(bodyParser.urlencoded({ extended: true }));



statisticsRouter.get('/getStatisticsData',(req,res)=>{
    try {
  
      const sql = 'CALL calculateStatistics()';
  
      database.query(sql,(err,resutl)=>{
        if(err){
          console.log(err);
          return res.status(400).json({error:`There was a servor error during fetching statistics data`});
        }
        else {
         // console.log(resutl);
          return res.status(200).json({statistics:resutl});
        }
      })
  
    }
    catch(err){
      console.log(err);
      return res.status(500).json({error:`There was a servor error during fetching statistics data`})
    }
  })
  
  
  export default statisticsRouter;
  