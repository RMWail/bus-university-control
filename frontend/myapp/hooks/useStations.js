import { useState, useEffect } from 'react';
import { stationService } from "../services/stationService";


export const useStations =()=> {

const [stations, setStations] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

const fetchStations = async ()=>{
    try {
        setLoading(true);
        setError(null);
        const response = await stationService.getAllStations();
        setStations(
            response.stations.map(({ ID_ARRET, NOM_ARRET }) => ({
                id: ID_ARRET,
                name: NOM_ARRET
            }))
        );
        
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
   };

   useEffect(()=>{
    fetchStations();
   },[]);


   const addStation = async (station) => {

        const serviceAddResponse = await stationService.addStation(station);
       console.log('serviceAddResponse = ',serviceAddResponse);
        if(serviceAddResponse.status==200){
                  
        setStations((prev) => [
            ...prev, 
            { id: serviceAddResponse.data.newStationId, name: station.name }
        ]);
        }

   return serviceAddResponse

};

   const updateStation = async (updatedStation)=>{
      
        const serviceUpdateResponse = await stationService.updateStation(updatedStation)
        console.log("UPDATE STATUS = "+serviceUpdateResponse.status);
        if(serviceUpdateResponse.status == 200){
 

            setStations(prev => prev.map(station => 
                station.id == updatedStation.id ? { ...updatedStation, id: station.id } : station
              ));
        }

        return serviceUpdateResponse

    }

   const deleteStation = async (stationId)=>{

    const serviceDeleteResponse = await stationService.deleteStation(stationId)
     console.log('STATION DELETE STATUS = ',serviceDeleteResponse.status);

     if(serviceDeleteResponse.status == 200){
        setStations((prev)=>prev.filter(station=>station.id!==stationId));
     }
    return serviceDeleteResponse;
   };

return { stations, loading, error, fetchStations, addStation, updateStation, deleteStation };

};