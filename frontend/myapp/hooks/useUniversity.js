import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { universityService } from '../services/universityService';

export const useUniversity = () => {
  const queryClient = useQueryClient();

  // GET ALL UNIVERSITIES
  const { data, isLoading, isError } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const response = await universityService.getAllUniversities();

      if (response.status !== 200) {
        throw new Error(response.message || "Error fetching universities");
      }
      
      return response.data.universitySections.map(
        ({ univSection_Id, univ_name, modifyAvailability, deleteAvailability }) => ({
          id: univSection_Id,
          name: univ_name,
          modify: modifyAvailability,
          delete: deleteAvailability,
        })
      );
    },
    staleTime: Infinity,
  });

  // ADD UNIVERSITY
  const addUniversityMutation = useMutation({
    mutationFn: async (university) => {
      return await universityService.addUniversitySection(university);
    },
    onSuccess: (response, university) => {
      if (response.status === 200) {
        queryClient.setQueryData(['universities'], (old) => [
          ...(old || []),
          {
            id: response.data.newUnivId,
            name: university.name,
            modify: 1,
            delete: 1,
          },
        ]);
        queryClient.invalidateQueries(['homePathsData']);
        queryClient.invalidateQueries(['routes']);
      }
      
    },
  });

  // UPDATE UNIVERSITY
  const updateUniversityMutation = useMutation({
    mutationFn: async (updatedUniversity) => {
      return await universityService.updateUniversitySection(updatedUniversity);
    },
    onSuccess: (response, updatedUniversity) => {
      if (response.status === 200) {
        queryClient.setQueryData(['universities'], (old) =>
          old.map((university) =>
            university.id === updatedUniversity.id
              ? {
                  ...updatedUniversity,
                  id: university.id, // preserve ID
                  modify: university.modify,
                  delete: university.delete,
                }
              : university
          )
        );
        queryClient.invalidateQueries(['homePathsData']);
        queryClient.invalidateQueries(['routes']);
      }
    },
  });

  // DELETE UNIVERSITY
  const deleteUniversityMutation = useMutation({
    mutationFn: async (universityId) => {
      return await universityService.deleteUniversitySection(universityId);
    },
    onSuccess: (response, universityId) => {
      if (response.status === 200) {
        queryClient.setQueryData(['universities'], (old) =>
          old.filter((university) => university.id !== universityId)
        );
        queryClient.invalidateQueries(['homePathsData']);
        queryClient.invalidateQueries(['routes']);
      }
    },
  });

  return {
    universitySections: data || [],
    loading: isLoading,
    error: isError,
    addUniversitySection: addUniversityMutation.mutateAsync,
    updateUniversitySection: updateUniversityMutation.mutateAsync,
    deleteUniversitySection: deleteUniversityMutation.mutateAsync,
  };
};

