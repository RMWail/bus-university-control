/*
import { useEffect,useState } from "react";
import { routeService } from "../services/routeService";


export const useRoutes = ()=>{

    const [routes,setRoutes] = useState([]);
    const [availableStations, setAvailableStations] = useState([]);
    const [availableBuses, setAvailableBuses] = useState([]); // This should be fetched from API
    const [universitySections, setUniversitySections] = useState([]); // This should be fetched from API
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const getUniversitySectionName = (id) => {
        const section = universitySections.find(section => section.UNIV_ID == id);
        return section ? section.UNIV_NAME : '';
      };
    
    const fetchRoutesData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await routeService.getRoutesData();
            setRoutes(response.data.currentCreatedRoutes);
            setAvailableStations(response.data.stations);
            setUniversitySections(response.data.universitySections);
            setAvailableBuses(response.data.buses);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching routes:', error);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchRoutesData();
    },[]);


    const addNewRoute = async(newRoute)=>{
        const serviceAddRouteResponse = await routeService.addNewRoute(newRoute);
        console.log('serviceAddRouteResponse = ',serviceAddRouteResponse);
        
        if(serviceAddRouteResponse.status == 200){
            setRoutes(prev => [...prev, { ...newRoute, id: serviceAddRouteResponse.data.relationId,section:newRoute.universitySection }]);
            setAvailableBuses(serviceAddRouteResponse.data.buses);
        }
        return serviceAddRouteResponse
    }

    const editRoute = async(routeId,oldBuses,updatedRoute) => {
        const serviceEditRouteResponse = await routeService.editRoute(routeId, oldBuses, updatedRoute);
        console.log('serviceEditRouteResponse = ',serviceEditRouteResponse);
        
        if(serviceEditRouteResponse.status == 200){
            setRoutes(prev => prev.map(route => 
                route.id === routeId ? { ...updatedRoute, id: updatedRoute.id,section:getUniversitySectionName(updatedRoute.ID_UNIV)} : route
            ));
            setAvailableBuses(serviceEditRouteResponse.data.buses);
        }
        return serviceEditRouteResponse
    }

    const deleteRoute = async(routeId)=>{
        const serviceDeleteRouteResponse = await routeService.deleteRoute(routeId);

        console.log('serviceDeleteRouteResponse='+serviceDeleteRouteResponse);

        if(serviceDeleteRouteResponse.status == 200){
          setRoutes(prev =>prev.filter(route => route.id !== routeId));
          setAvailableBuses(serviceDeleteRouteResponse.data.buses);
        }

        return serviceDeleteRouteResponse;

    }

    return {loading,error,routes,availableStations,availableBuses,universitySections,addNewRoute,editRoute,deleteRoute};

} */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { routeService } from "../services/routeService";

export const useRoutes = () => {
    const queryClient = useQueryClient();

    // Fetch Routes Data using useQuery
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['routes'],
        queryFn: async () => {
            const response = await routeService.getRoutesData();
            if (response.status !== 200) {
                throw new Error(response.message || "Error fetching routes");
            }
            return response.data;
        },
        staleTime: Infinity, // 5 minutes cache
    });

    // Mutations for adding, editing, and deleting routes
    const addNewRouteMutation = useMutation({
        mutationFn: async (newRoute) => {
            return await routeService.addNewRoute(newRoute);
        },
        onSuccess: (response) => {
            if (response.status === 200) {
                queryClient.invalidateQueries(['routes']); // Refresh routes data
            }
        },
    });

    const editRouteMutation = useMutation({
        mutationFn: async ({routeId, oldBuses, updatedRoute}) => {
            return await routeService.editRoute(routeId, oldBuses, updatedRoute);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['routes']);
        },
    });

    const deleteRouteMutation = useMutation({
        mutationFn: async (routeId) => {
            return await routeService.deleteRoute(routeId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['routes']);
        },
    });

    return {
        loading: isLoading,
        error: isError ? error.message : null,
        routes: data?.currentCreatedRoutes || [],
        availableStations: data?.stations || [],
        availableBuses: data?.buses || [],
        universitySections: data?.universitySections || [],
        addNewRoute: addNewRouteMutation.mutateAsync,
        editRoute: editRouteMutation.mutateAsync,
        deleteRoute: deleteRouteMutation.mutateAsync,
    };
};
