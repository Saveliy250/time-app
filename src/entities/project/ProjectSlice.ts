import type {IProject} from "./IProject.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {projectRepository} from "entities/project/ProjectRepository.ts";



export const getProjects = createAsyncThunk<IProject[]>(
    'getProjects',
    async (_, thunkAPI) => {
        try {
            const response = await projectRepository.getAllProjects()
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
                    timeToComplete: project.timeToComplete,
                    timeSpent: 0
                }
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('ошибка при создании проекта')
        }
    }
)

export const updateProjectTimeSpentById = createAsyncThunk<IProject, Pick<IProject, 'id' | 'timeSpent'>>(
    'updateProject',
    async (project, thunkAPI) => {
        try {
            const response = await projectRepository.updateProjectTimeSpentById({
                params: {
                    id: project.id,
                    timeSpent: project.timeSpent
                },
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('ошибка пр  попытке обновить проект')
        }
    }
)

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    isError: boolean;
    error: string;
    chosenProject: IProject | null;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    isError: false,
    error: '',
    chosenProject: null,
}

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setChosenProject: (state, action: PayloadAction<IProject>) => {
            state.chosenProject = action.payload;
        },
        setTimeSpent: (state, action: PayloadAction<number>) => {
            if (state.chosenProject) {
                state.chosenProject.timeSpent = action.payload;
            }
        }
    },
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
                state.isError = true
                state.error =
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
                state.isError = true
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(updateProjectTimeSpentById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(updateProjectTimeSpentById.fulfilled, (state, action) => {
                state.isLoading = false
                const proj = state.projects.find(p => p.id === action.payload.id)
                if (!proj) {return}

                proj.timeSpent = action.payload.timeSpent
            })
    }
})

export const {setChosenProject, setTimeSpent} = projectSlice.actions;
export const {reducer: projectReducer} = projectSlice