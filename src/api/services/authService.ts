import api from "../axiosInstance"
import type { LoginRequest, LoginResponse } from "../../types/auth"

export interface ExtendedLoginRequest extends LoginRequest {
  expiresInMins?: number
}

export const login = async (
  credentials: ExtendedLoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials)
  return response.data
}
