import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IUser} from "../../entities/auth/IUser.ts";
import type {IAuthResponse} from "../models/IResponses.ts";
import {authRepository} from "../../entities/auth/AuthRepository.ts";
import type {IProject} from "../../entities/project/IProject.ts";
import {projectRepository} from "../../entities/project/ProjectRepository.ts";

const token = localStorage.getItem("token");

export const registerUser =  createAsyncThunk<IAuthResponse, IUser>(
    'registerUser',
    async (user, thunkAPI) => {
        try {
            const response = await authRepository.registerUser({
                params: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('не удалось зарегистрироваться')
        }
    }
)

export const loginUser = createAsyncThunk<IAuthResponse, IUser>(
    'loginUser',
    async (user, thunkAPI) => {
        try {
            const response = await authRepository.loginUser({
                params: {
                    email: user.email,
                    password: user.password,
                }
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('не удалось войти')
        }
    }
)

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

export const postProject = createAsyncThunk<IProject, Omit<IProject, 'id'>>(
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