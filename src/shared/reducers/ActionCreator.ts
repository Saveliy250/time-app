import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import type {IUser} from "../models/IUser.ts";


export const registerUser = (user: IUser) => createAsyncThunk(
    'registerUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post('https://73a95a8fb71c882b.mokky.dev/register', {
                name: user.name,
                email: user.email,
                password: user.password,
            })
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('не удалось зарегистрироваться')
        }
    }
)