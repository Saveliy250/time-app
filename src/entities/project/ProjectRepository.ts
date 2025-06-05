import type {AxiosRequestConfig} from "shared/models/AxiosRequestConfig.ts";
import {httpClient} from "shared/api/httpClient.ts";
import type {IProject} from "./IProject.ts";

class ProjectRepository {
    getAllProjects(requestConfig?: AxiosRequestConfig) {
        return httpClient.get<IProject[]>('/projects', requestConfig?.config)
    }

    postProject({params, config}: AxiosRequestConfig<Omit<IProject, 'id'>>){
        return httpClient.post('projects', params, config)
    }
}

export const projectRepository = new ProjectRepository();