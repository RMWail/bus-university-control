import { useState, useEffect } from 'react';

import { universityService} from '../services/universityService'


export const useUniversity =()=>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [universitySections, setUniversitySections] = useState([]);

    const fetchUniversities = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await universityService.getAllUniversities();
          setUniversitySections(
            response.universitySections.map(({ univSection_Id, univ_name, modifyAvailability,  deleteAvailability}) => ({
              id: univSection_Id,
              name: univ_name,
              modify:modifyAvailability,
              delete:deleteAvailability,
            }))
          );
        } catch (error) {
          setError(error.message);
          console.error('Error fetching universities:', error);
          
        }
        finally {
          setLoading(false);
        }
      };

      
  useEffect(() => {
    fetchUniversities();
  }, []);


  const addUniversitySection = async (university) => {

    const serviceAddResponse = await universityService.addUniversitySection(university);
   console.log('serviceAddResponse = ',serviceAddResponse);
    if(serviceAddResponse.status==200){
              
      setUniversitySections((prev) => [
        ...prev, 
        { id: serviceAddResponse.data.newUnivId,
          name: university.name,
          modify:1,
          delete:1,
        }
    ]);
    }

return serviceAddResponse

};

const updateUniversitySection = async (updatedUniversity)=>{
  
    const serviceUpdateResponse = await universityService.updateUniversitySection(updatedUniversity)
    console.log("UPDATE STATUS = "+serviceUpdateResponse.status);
    if(serviceUpdateResponse.status == 200){


      setUniversitySections(prev => prev.map(university => 
        university.id == updatedUniversity.id ? { ...updatedUniversity,
           id: university.id,
           modify: university.modify,
           delete: university.delete } : university
          ));
    }

    return serviceUpdateResponse

}

const deleteUniversitySection = async (universityId)=>{

const serviceDeleteResponse = await universityService.deleteUniversitySection(universityId)
 console.log('STATION DELETE STATUS = ',serviceDeleteResponse.status);

 if(serviceDeleteResponse.status == 200){
    setUniversitySections((prev)=>prev.filter((university)=>university.id!=universityId))
 }
return serviceDeleteResponse;
};


  return {universitySections, loading, error, addUniversitySection, updateUniversitySection, deleteUniversitySection}

}

