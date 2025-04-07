import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// the function that are here are properties of the stationService object

export const stationService = {

     getAllStations: async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllStations`);
          //  console.log(response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    addStation: async (station) => {
        try {
            const response = await axios.post(`${apiUrl}/addStation`, station);
            return response;
        } catch (error) {
            
            return error;
        }
    },
    updateStation: async (station) => {
        try {
            const response = await axios.post(`${apiUrl}/updateStation`, station);
            return response;
        } catch (error) {
            return error;
        }
    },
    deleteStation: async (stationId) => {
        try {
            const response = await axios.post(`${apiUrl}/deleteStation`, { stationId:stationId });
            return response;
        } catch (error) {
            return error;
        }
    }
}