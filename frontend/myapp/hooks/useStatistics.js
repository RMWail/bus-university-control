import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statisticsService';

export const useStatistics = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await statisticsService.getStatisticsData();
      const data = response.data.statistics;
      return {
        totalBuses: data[0][0].totalNbrBuses || 0,
        activeBuses: data[1][0].nbrActiveBuses || 0,
        inactiveBuses: (data[0][0].totalNbrBuses || 0) - (data[1][0].nbrActiveBuses || 0),
        totalRoutes: data[2][0].totalNbrRoutes || 0,
        totalStations: data[3][0].totalNbrStations || 0,
        coveredStations: data[4][0].stationsWithBuses || 0,
        uncoveredStations: (data[3][0].totalNbrStations || 0) - (data[4][0].stationsWithBuses || 0),
      };
    },
    staleTime: Infinity, // always refetch when invalidated
    refetchOnWindowFocus: false,
  });

  return {
    stats: data || [],
    loading: isLoading,
    error: isError ? error.message : null,
  };
};


