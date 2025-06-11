import type {IUser} from "./IUser.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IAuthResponse} from "shared/models/IResponses.ts";
import {authRepository} from "entities/user/AuthRepository.ts";


const token = localStorage.getItem("token");

export const registerUser = createAsyncThunk<IAuthResponse, IUser>(
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

export const updateUserById = createAsyncThunk<IUser, Omit<IUser, 'password'>>(
    'updateUserById',
    async (user, thunkApi) => {
        try {
            const response = await authRepository.updateUser({
                params: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                config: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            })
            return response.data;
        } catch {
            return thunkApi.rejectWithValue('ошибка при попытке внести изменения')
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

const userJson = localStorage.getItem('user');
const parsedUser: IUser | null = userJson ? JSON.parse(userJson) : null;

const initialState: UserState = {
    user: parsedUser,
    token: null,
    isLoading: false,
    isError: false,
    error: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logoutUser: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.user = action.payload.data;
                state.isLoading = false
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.data));
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
                localStorage.setItem("user", JSON.stringify(action.payload.data));
            })
            .addCase(updateUserById.pending, state => {
                state.isLoading = true
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
    }
})
export const {logoutUser} = userSlice.actions;
export const {reducer: userReducer} = userSlice;