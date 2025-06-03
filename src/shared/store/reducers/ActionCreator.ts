import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IUser} from "../../models/IUser.ts";
import type {IAuthResponse} from "../../models/IResponses.ts";
import {authRepository} from "../../api/AuthRepository.ts";


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