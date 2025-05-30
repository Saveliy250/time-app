import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "../shared/store/reducers/UserSlice.ts";

const rootReducer = combineReducers({
    user: userReducer,
})

export const setUpStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']