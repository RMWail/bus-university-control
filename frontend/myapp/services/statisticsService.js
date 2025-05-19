import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const statisticsService = {

    getStatisticsData: async()=>{
        try {

            const response = await axios.get(`${apiUrl}/getStatisticsData`);
          
            return response
        }
        catch(err){
            return err;
        }
    },
}