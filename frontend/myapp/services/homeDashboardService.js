import axios  from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const homeDashboardService = {

    getRoutesData: async()=>{
        try {
            const response = await axios.get(`${apiUrl}/getPathsData`);
            return response;
        }
        catch(err){
            console.log(err);
            return err;
        }
    }

};
