import axios, { AxiosInstance, AxiosError } from 'axios';
import { STORAGE_KEYS } from '~keys/storage.keys'; 

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(private baseUrl: string = `${process.env.API_URL}`) {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      console.error("Backend returned status code:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }

  public async get<T>(endpoint: string, requiresAuth: boolean = false): Promise<T> {
    try {
      const headers = requiresAuth ? this.getAuthHeaders() : {};
      const response = await this.axiosInstance.get<T>(`${this.baseUrl}${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async post<T, D>(endpoint: string, data: D, requiresAuth: boolean = false): Promise<T> {
    try {
      const headers = requiresAuth ? this.getAuthHeaders() : {};
      const response = await this.axiosInstance.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async put<T, D>(endpoint: string, data: D, requiresAuth: boolean = false): Promise<T> {
    try {
      const headers = requiresAuth ? this.getAuthHeaders() : {};
      const response = await this.axiosInstance.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  public async delete<T>(endpoint: string, requiresAuth: boolean = false): Promise<T> {
    try {
      const headers = requiresAuth ? this.getAuthHeaders() : {};
      const response = await this.axiosInstance.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }
}

export default HttpService;