import {httpClient} from "../../shared/api/httpClient.ts";
import type {IUser} from "./IUser.ts";
import type {AxiosRequestConfig} from "../../shared/models/AxiosRequestConfig.ts";

class AuthRepository {
    registerUser({params, config} : AxiosRequestConfig<Omit<IUser, 'id'>>) {
        return httpClient.post('/register', params, config)
    }
    
    loginUser({params, config} : AxiosRequestConfig<Pick<IUser, 'email' | 'password'>>) {
        return httpClient.post('/auth', params, config)
    }
}

export const authRepository = new AuthRepository();