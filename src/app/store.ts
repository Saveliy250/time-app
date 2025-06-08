import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../entities/user/UserSlice.ts";
import {projectReducer} from "../entities/project/ProjectSlice.ts";
import {timerReducer} from "entities/timer/TimerSlice.ts";

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    timer: timerReducer,
})

export const setUpStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']