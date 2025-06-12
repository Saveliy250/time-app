import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "shared/hooks/redux.ts";
import { updateProjectTimeSpentById } from "entities/project/ProjectSlice.ts";
import {getTimeFromSeconds} from "shared/tools/timeFromSeconds.ts";

export const useProjectTimer = (id: number, initTime: number) => {
    const [timer, setTimer] = useState(initTime);
    const [isRunning, setIsRunning] = useState(false);
    const timeRef = useRef<NodeJS.Timeout>(undefined);
    const timerValueRef = useRef(timer);

    timerValueRef.current = timer;

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
            const timerValue = timerValueRef.current;


            if (timerValue > initTime) {
                dispatch(updateProjectTimeSpentById({ id: id, timeSpent: timerValue }));
                setTimer(0);
            }

            clearInterval(timeRef.current);
        };
    }, []);

    return {
        ...getTimeFromSeconds(timer),
        timer,
        isRunning,
        toggleTimer,
    };
};