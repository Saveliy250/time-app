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

    updateProjectTimeSpentById({params, config}: AxiosRequestConfig<Pick<IProject, 'id' | 'timeSpent'>>){
        return httpClient.patch(`projects/${params.id}`, {timeSpent: params.timeSpent}, config)
    }
}

export const projectRepository = new ProjectRepository();