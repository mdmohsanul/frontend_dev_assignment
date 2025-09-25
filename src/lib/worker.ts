import api from "./axios"
import { WorkerType } from "@/types/workers"


export type WorkersResponse = {
  success: boolean
  data: WorkerType[]
  metadata: {
    total: number
    page: number
    limit: number
    totalPages: number
    servicesList:string[]
  }
  timestamp: string
}

export interface FetchWorkersParams {
  page?: number
  limit?: number
  service?: string
  minPrice?: number
  maxPrice?: number
}

export const fetchWorkers = async (params: FetchWorkersParams): Promise<WorkersResponse> => {
  try {
    const response = await api.get<WorkersResponse>("/workers", {
      params: { type: "workers", ...params },
    })
    return response.data
  } catch (error: any) {
    console.error("Failed to fetch workers:", error)
    throw new Error(error?.response?.data?.message || "Failed to fetch workers")
  }
}
