import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {updateProjectTimeSpentById} from "entities/project/ProjectSlice.ts";


export const useTimer = (id: number, initTime: number) => {

    const [timer, setTimer] = useState(initTime)
    const timeRef = useRef<number>(initTime);
    const [isRunning, setIsRunning] = useState(false);

    const dispatch = useAppDispatch();
    const {chosenProject} = useAppSelector(state => state.project);



    useEffect(() => {
        if (!isRunning || !chosenProject?.id){return}
        const timerId = setInterval(() => {
            timeRef.current += 1
            setTimer(timeRef.current)
            }, 1000);
        return () => {clearInterval(timerId);}
    }, [isRunning]);



    useEffect(() => {
        return () => {
            if (timeRef.current > initTime) {
                dispatch(updateProjectTimeSpentById({id: id, timeSpent: timeRef.current}))
                timeRef.current = 0
                setTimer(timeRef.current)
            }}
    }, [dispatch, id, initTime]);

    return {
        timer,
        isRunning,
        setIsRunning,
    }
}