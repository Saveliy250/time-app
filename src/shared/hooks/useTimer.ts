import {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "shared/hooks/redux.ts";
import {updateProjectTimeSpentById} from "entities/project/ProjectSlice.ts";


export const useTimer = (id: number, initTime: number) => {

    const [timer, setTimer] = useState(initTime)
    const timeRef = useRef<NodeJS.Timeout>(undefined)
    const timerValueRef = useRef(timer)
    const [isRunning, setIsRunning] = useState(false);

    const dispatch = useAppDispatch();

    const toggleTimer = () => setIsRunning((prev) => !prev);

    useEffect(() => {
        if (!isRunning || !id) {
            return;
        }
        timeRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(timeRef.current);
        };
    }, [isRunning]);



    useEffect(() => {
        return () => {
            console.log(timerValueRef.current);
            const timerValue = timerValueRef.current;
            if (timer > initTime) {
                dispatch(updateProjectTimeSpentById({ id: id, timeSpent: timerValue}));
                setTimer(0);
            }

            clearInterval(timeRef.current)
        };
    }, []);

    return {
        timer,
        isRunning,
        toggleTimer,
    }
}