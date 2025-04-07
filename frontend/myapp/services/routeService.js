import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const routeService = {

    getRoutesData: async()=>{

        try {
            const response = await axios.get(`${apiUrl}/getRoutesData`);
            return response;
        }
        catch(err){
            return err;
        }
    },

    addNewRoute: async(newRoute)=>{
        try {
            const response = await axios.post(`${apiUrl}/addNewRoute`,newRoute);
            return response;
        }
        catch(err){
            return err;
        }
    },

    editRoute: async(routeId,oldBuses,newRoute)=>{
        try {
            const response = await axios.post(`${apiUrl}/editRoute`,{routeId:routeId,oldBuses:oldBuses,newRoute});
            return response;
        }
        catch(err){
            return err;
        }
    },

    deleteRoute: async(routeId)=>{
        try {
            const response = await axios.post(`${apiUrl}/deleteRoute`,{routeId:routeId});
            return response;
        }
        catch(err){
            return err;
        }
    }


}