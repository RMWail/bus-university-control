import { useEffect,useState } from "react";
import {homeDashboardService} from "../services/homeDashboardService";

export const useHomeDashboard = ()=>{

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [routes, setRoutes] = useState([]);

    const fetchRoutes = async ()=>{
        try {
         setLoading(true);
         setError(null);
         const reponse = await homeDashboardService.getRoutesData();
         setRoutes(reponse.data.paths);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchRoutes();
    },[]);

    return {loading,error,routes};
}