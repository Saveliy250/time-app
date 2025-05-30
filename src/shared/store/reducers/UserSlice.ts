import type {IUser} from "../../models/IUser.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {registerUser} from "./ActionCreator.ts";
import type {IAuthResponse} from "../../models/IResponses.ts";


interface UserState {
    user: IUser | null,
    token: string | null,
    loading: boolean,
    error: string,
}

const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.loading = false
                state.user = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error =
                    typeof action.payload === "string" ? action.payload : "Неизвестная ошибка";
            })
    }
})

export const {reducer: userReducer} = userSlice;