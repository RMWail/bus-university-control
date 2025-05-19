import axios  from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const universityService = {
      
    getAllUniversities: async() => {
        try {
      
            const response = await axios.get(`${apiUrl}/getUniversitySections`);
            
            return response
        }
        catch(err){
            return err;
        }
    },

    addUniversitySection: async (university) => {
       try {
           
        const response = await axios.post(`${apiUrl}/addUniversitySection`,university);
        return response;
       }
       catch(err){
        console.log(err);
        return err;
       }
    },

    updateUniversitySection: async (university) => {
       try {
           
        const response = await axios.post(`${apiUrl}/updateUniversitySection`,university);
        return response;
       }
       catch(err){
        console.log(err);
        return err;
       }
    },

    deleteUniversitySection: async (universityId) => {
       try {
           const response = await axios.post(`${apiUrl}/deleteUniversitySection`,{universityId:universityId})
           return response;
       }
       catch(err){
        console.log(err);
        return err;
       }
    },

}