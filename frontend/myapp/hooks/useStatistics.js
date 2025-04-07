import { useEffect,useState } from 'react';
import {statisticsService} from '../services/statisticsService.js';


export const useStatistics = ()=>{

const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [stats, setStats] = useState({
    totalBuses: 0,
    activeBuses: 0,
    inactiveBuses: 0,
    totalRoutes: 0,
    totalStations: 0,
    coveredStations: 0,
    uncoveredStations: 0
  });

 const fetchStatistics = async ()=>{

    try {
        setLoading(true);
        setError(null);
        const response = await statisticsService.getStatisticsData();
        const data = response.data.statistics;
        setStats({
          totalBuses: data[0][0].totalNbrBuses || 0,
          activeBuses: data[1][0].nbrActiveBuses || 0,
          inactiveBuses: data[0][0].totalNbrBuses - data[1][0].nbrActiveBuses || 0,
          totalRoutes: data[2][0].totalNbrRoutes || 0,
          totalStations: data[3][0].totalNbrStations || 0,
          coveredStations: data[4][0].stationsWithBuses || 0,
          uncoveredStations: data[3][0].totalNbrStations - data[4][0].stationsWithBuses || 0
        });
 
    }
     catch(err){
        setError(err.message);
        setLoading(false);
     }
     finally{
        setLoading(false);
     }
 }

 useEffect(()=>{
    fetchStatistics();
 },[]);

 return {loading,error,stats};
}
