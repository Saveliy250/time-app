import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ITimer} from "entities/timer/ITimer.ts";

interface TimerState {
    timers: ITimer[];
}


const initialState: TimerState = {
    timers: [],
}

const TimerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        initTimer: (state, action: PayloadAction<number>) => {
            const initTimer: ITimer = {
                id: action.payload,
                startTime: 0,
                endTime: 0,
                timeSpent: 0,
                isRunning: false,
            }
            state.timers.push(initTimer);
        },

        startTimer: (state, action: PayloadAction<{ timestamp: number; id: number }>) => {
            const timer = state.timers.find(t => t.id === action.payload.id);
            if(!timer) {return}

            timer.isRunning = true;
            timer.startTime = action.payload.timestamp;
        },

        endTimer: (state, action: PayloadAction<{timestamp: number; id: number}>) => {
            const timer = state.timers.find(t => t.id === action.payload.id);
            if(!timer) {return}

            timer.isRunning = false;
            timer.endTime = action.payload.timestamp;
            timer.timeSpent = timer.endTime - timer.startTime;
        }
    }
})

export const {startTimer, endTimer, initTimer} = TimerSlice.actions;
export const {reducer: timerReducer} = TimerSlice