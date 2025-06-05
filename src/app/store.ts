import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../entities/auth/UserSlice.ts";
import {projectReducer} from "../entities/project/ProjectSlice.ts";

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
})

export const setUpStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']