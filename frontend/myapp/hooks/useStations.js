import { stationService } from "../services/stationService";
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';

export const useStations =()=> {

const queryClient = useQueryClient();

const {data,isLoading,isError} = useQuery({
    queryKey: ['stations'],
    queryFn: async ()=>{
        const response = await stationService.getAllStations();
        if(response.status !== 200){
            throw new Error(response.message || "Error fetching stations");
        }
       
        return response.data.stations.map(({ ID_ARRET, NOM_ARRET }) => ({
            id: ID_ARRET,
            name: NOM_ARRET,
          }));
    },
    staleTime: Infinity,
})

const addNewStationMutation = useMutation({
    mutationFn: async (station)=>{
        return await stationService.addStation(station);
    },
    onSuccess: (response) =>{
        if(response.status == 200){
            queryClient.invalidateQueries(['stations']);
            queryClient.invalidateQueries(['routes']);
        }
    }
})

const updateStationMutation = useMutation({
    mutationFn: async(updatedStation)=>{
        return await stationService.updateStation(updatedStation);
    },
    onSuccess: ()=>{
            queryClient.invalidateQueries(['stations']);
            queryClient.invalidateQueries(['routes']);
    }
})

    const deleteStationMutation = useMutation({
        mutationFn: async(stationId)=>{
            return await stationService.deleteStation(stationId);
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['stations']);
            queryClient.invalidateQueries(['routes']);
        }
    })

return { 

     loading:isLoading,
     error:isError,
     stations: data || [],
     addStation : addNewStationMutation.mutateAsync, 
     updateStation : updateStationMutation.mutateAsync,
     deleteStation: deleteStationMutation.mutateAsync };
};