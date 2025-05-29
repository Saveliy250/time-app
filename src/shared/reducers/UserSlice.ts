import type {IUser} from "../models/IUser.ts";
import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from "./ActionCreator.ts";


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
            .addCase(registerUser., state => {

            })
    }
})