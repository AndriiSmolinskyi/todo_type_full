import axios, { AxiosResponse } from "axios";

class HttpService{
    private baseUrl: string;

    constructor(baseUrl: string = `${process.env.API_URL}`) {
        this.baseUrl = baseUrl
    }

    private getFullApiUrl(endpoint: string):string{
        return `${this.baseUrl}${endpoint}`
    }

    get<T>(endpoint: string): Promise<AxiosResponse<T>>{
        return axios.get<T>(this.getFullApiUrl(endpoint))
    }

    post<T, D>(endpoint: string, data: D): Promise<AxiosResponse<T>> {
        return axios.post<T>(this.getFullApiUrl(endpoint), data);
    }

    put<T, D>(endpoint: string, data: D): Promise<AxiosResponse<T>> {
        return axios.put<T>(this.getFullApiUrl(endpoint), data);
    }

    delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(this.getFullApiUrl(endpoint));
    }

}

export default HttpService