import express from 'express';
import database from '../config/database.js';
import multer from 'multer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const upload = multer();
dotenv.config();
const router = express.Router();

router.use(bodyParser.json());
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));


const stringToArray = (array) =>{
    return array.split(',');
  }
  router.get('/getPathsData',(req,res)=>{
  
    try {
         const sql = 'CALL getPathsData()';
         database.query(sql,(err,paths)=>{
           if(err){
             console.log(err);
             return res.status(500).json({error:`There was a servor error during fetching paths data`})
           }
           else {
           // console.log(paths[0]);
            let pathsData = [];
        
            
            paths[0].forEach(element => {
              const drivers = element.busesInfo.split(',');
              let busesInfo = [];
              for(let i=0;i<drivers.length;i++) {
               let busInfo = {
                  busNumber:drivers[i].split(' - ')[0],
                  driverName:drivers[i].split(' - ')[1],
                  driverPhone:drivers[i].split(' - ')[2],
                }
              //  console.log(busInfo);
                busesInfo.push(busInfo);
              }
            //  console.log("drivers = "+drivers);
              let path = {
                id:element.id,
                section:element.section,
                mainStation:element.mainStation,
                internalStations:stringToArray(element.internalStations),
                busesInfo:busesInfo,
              }
              pathsData.push(path);
            });
        //    console.log(pathsData);
  
             return res.status(200).json({paths:pathsData});
           }
         })
    }
    catch(err){
      console.log(err);
      return res.status(500).json({error:`There was a servor error during fetching paths data`})
    }
  })


  export default router;