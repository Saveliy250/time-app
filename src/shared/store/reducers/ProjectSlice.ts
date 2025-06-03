import type {IProject} from "../../models/IProject.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getProjects, postProject} from "./ActionCreator.ts";

interface ProjectsState {
    projects: IProject[] | [];
    loading: boolean | null;
    error: string;
}

const initialState: ProjectsState = {
    projects: [],
    loading: null,
    error: ''
}

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, state => {
                state.loading = true
            })
            .addCase(getProjects.fulfilled, (state, action: PayloadAction<IProject[]>) => {
                state.loading = false
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(postProject.pending, state => {
                state.loading = true
            })
            .addCase(postProject.fulfilled, (state, action: PayloadAction<IProject>) => {
                state.loading = false
                state.projects.push(action.payload)
            })
            .addCase(postProject.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
    }
})

export const {reducer: projectReducer} = projectSlice