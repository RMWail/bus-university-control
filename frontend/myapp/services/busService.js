import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const busService = {

    getAllBuses: async()=>{
        try {
           const response = await axios.get(`${apiUrl}/getAllBuses`);
           return response;
        }
        catch(err){
            return err;
        }
    },

    addBus: async(newBus)=>{
        try {
           const response = await axios.post(`${apiUrl}/addNewBus`,newBus);
           return response;
        }
        catch(err){
            return err;
        }
    },

    updateBus: async(bus,oldBusNbr)=>{
          try {
               const response = await axios.post(`${apiUrl}/updateBus`,{bus,oldBusNbr});
               return response;
          }
          catch(err){
            return err;
          }
    },

    deleteBus: async(busId)=>{
        try {
             const response = await axios.post(`${apiUrl}/deleteBus`,{busId:busId})
             return response;
        }
        catch(err){
            return err;
        }
    }


}