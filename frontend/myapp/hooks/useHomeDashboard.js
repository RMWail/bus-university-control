import { useEffect,useState } from "react";
import {homeDashboardService} from "../services/homeDashboardService";
import { useQuery } from "@tanstack/react-query";


export const useHomeDashboard = ()=>{

    const {isLoading,isError,data} = useQuery({
        queryKey: ['homePathsData'],
        queryFn: async ()=>{
            const response = await homeDashboardService.getRoutesData();
            return response.data.paths;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    return {
        routes : data || [],
        loading : isLoading,
        error : isError};
}