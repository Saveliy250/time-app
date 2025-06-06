import type {IProject} from "./IProject.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {projectRepository} from "entities/project/ProjectRepository.ts";

const token = localStorage.getItem("token");


export const getProjects = createAsyncThunk<IProject[]>(
    'getProjects',
    async (_, thunkAPI) => {
        try {
            const response = await projectRepository.getAllProjects({
                config: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('ошибка в получении проектов')
        }
    }
)

export const addProject = createAsyncThunk<IProject, Omit<IProject, 'id'>>(
    'postProject',
    async (project, thunkAPI) => {
        try {
            const response = await projectRepository.postProject({
                params: {
                    title: project.title,
                    description: project.description,
                    tags: project.tags,
                },
                config: {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('ошибка при создании проекта')
        }
    }
)

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    isError: string;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    isError: ''
}

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, state => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action: PayloadAction<IProject[]>) => {
                state.isLoading = false
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(addProject.pending, state => {
                state.isLoading = true
            })
            .addCase(addProject.fulfilled, (state, action: PayloadAction<IProject>) => {
                state.isLoading = false
                state.projects.push(action.payload)
            })
            .addCase(addProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
    }
})

export const {reducer: projectReducer} = projectSlice