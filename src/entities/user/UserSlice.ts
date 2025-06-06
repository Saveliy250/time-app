import type {IUser} from "./IUser.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IAuthResponse} from "shared/models/IResponses.ts";
import {authRepository} from "entities/user/AuthRepository.ts";


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


interface UserState {
    user: IUser | null,
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    error: string
}

const initialState: UserState = {
    user: null,
    token: null,
    isLoading: false,
    isError: false,
    error: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.isLoading = false
                state.user = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
    }
})

export const {reducer: userReducer} = userSlice;