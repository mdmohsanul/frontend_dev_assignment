import { useQuery } from "@tanstack/react-query"
import { fetchWorkers, WorkersResponse, FetchWorkersParams } from "@/lib/worker"

export const useWorkers = (params: FetchWorkersParams) => {
  return useQuery<WorkersResponse, Error>({
    queryKey: ["workers", params],
    queryFn: () => fetchWorkers(params),
    placeholderData: (prev) => prev, // smooth pagination
    staleTime: 1000 * 60, // 1 minute cache
    retry: 2, // retry failed requests
  })
}
