import type {AxiosRequestConfig} from "../models/AxiosRequestConfig.ts";
import {httpClient} from "./httpClient.ts";
import type {IProject} from "../models/IProject.ts";

class ProjectRepository {
    getAllProjects(requestConfig?: AxiosRequestConfig) {
        return httpClient.get<IProject[]>('/projects', requestConfig?.config)
    }

    postProject({params, config}: AxiosRequestConfig<Omit<IProject, 'id'>>){
        return httpClient.post('projects', params, config)
    }
}

export const projectRepository = new ProjectRepository();