/*
import {busService} from '../services/busService.js';
import { useEffect, useState } from 'react';

export const useBuses = ()=>{

    const [buses,setBuses] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const fetchBuses = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const response = await busService.getAllBuses();
            
            setBuses(response.data.buses);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchBuses();
    },[]);

    const addNewBus = async(newBus)=>{

        const serviceAddBusResponse = await busService.addBus(newBus);
        console.log('serviceAddBusResponse = ',serviceAddBusResponse);
        
        if(serviceAddBusResponse.status == 200){
            const addedBus = {
                ID_BUS:serviceAddBusResponse.data.busId,
                NUMERO_BUS: newBus.NUMERO_BUS,
                nomChauffeur: newBus.nomChauffeur,
                telephoneChauffeur: newBus.telephoneChauffeur,
                valable: newBus.valable
              }
    
             setBuses(prev=>[...prev,addedBus]);
        }

         return serviceAddBusResponse;
    }

    const updateBus = async(updatedBus,oldBusNbr)=>{
        const serviceUpdateBusResponse = await busService.updateBus(updatedBus,oldBusNbr);
        console.log('serviceUpdateBusResponse = ',serviceUpdateBusResponse);
        
             if(serviceUpdateBusResponse.status == 200) {
                setBuses(prev => prev.map(bus => 
                    bus.ID_BUS === updatedBus.ID_BUS ? { ...bus, ...updatedBus } : bus
                  ));
                  
             }
         return serviceUpdateBusResponse;
    }

    const deleteBus = async(busId)=>{
    
        const serviceDeleteBusResponse = await busService.deleteBus(busId);
        console.log('serviceDeleteBusResponse = ',serviceDeleteBusResponse);

        if(serviceDeleteBusResponse.status == 200){
            setBuses(prev => prev.filter(bus => bus.ID_BUS !==busId));
        }

        return serviceDeleteBusResponse;
    }



    return {loading,error,buses,addNewBus,updateBus,deleteBus};
}


*/

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { busService } from '../services/busService';

export const useBuses = () => {
  const queryClient = useQueryClient();

  // GET ALL BUSES
  const { data, isLoading, isError } = useQuery({
    queryKey: ['buses'],
    queryFn: async () => {
      const response = await busService.getAllBuses();

      if (response.status !== 200) {
        throw new Error(response.message || "Error fetching buses");
      }

      return response.data.buses;
    },
    staleTime: Infinity, // or a time value if bus data changes frequently
  });

  // ADD BUS
  const addBusMutation = useMutation({
    mutationFn: async (newBus) => {
      return await busService.addBus(newBus);
    },
    onSuccess: (response, newBus) => {
      if (response.status === 200) {
        const addedBus = {
          ID_BUS: response.data.busId,
          NUMERO_BUS: newBus.NUMERO_BUS,
          nomChauffeur: newBus.nomChauffeur,
          telephoneChauffeur: newBus.telephoneChauffeur,
          valable: newBus.valable,
        };

        queryClient.setQueryData(['buses'], (old) => [...(old || []), addedBus]);
        queryClient.invalidateQueries(['routes']);
      }
    },
  });

  // UPDATE BUS
  const updateBusMutation = useMutation({
    mutationFn: async ({ updatedBus, oldBusNbr }) => {
      return await busService.updateBus(updatedBus, oldBusNbr);
    },
    onSuccess: (response, { updatedBus }) => {
      if (response.status === 200) {
        queryClient.setQueryData(['buses'], (old) =>
          old.map((bus) =>
            bus.ID_BUS === updatedBus.ID_BUS ? { ...bus, ...updatedBus } : bus
          )
        );
      }
      queryClient.invalidateQueries(['routes']);
    },
  });

  // DELETE BUS
  const deleteBusMutation = useMutation({
    mutationFn: async (busId) => {
      return await busService.deleteBus(busId);
    },
    onSuccess: (response, busId) => {
      if (response.status === 200) {
        queryClient.setQueryData(['buses'], (old) =>
          old.filter((bus) => bus.ID_BUS !== busId)
        );
      }
      queryClient.invalidateQueries(['routes']);
    },
  });

  return {
    buses: data || [],
    loading: isLoading,
    error: isError,
    addNewBus: addBusMutation.mutateAsync,
    updateBus: updateBusMutation.mutateAsync,
    deleteBus: deleteBusMutation.mutateAsync,
  };
};
