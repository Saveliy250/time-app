import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {useEffect} from "react";
import {getProjects} from "entities/project/ProjectSlice.ts";

export const useGetProjects = () => {
    const dispatch = useAppDispatch();
    const {projects, isLoading, isError} = useAppSelector(state => state.project);

    useEffect(() => {
        dispatch(getProjects());
    }, [])

    return {projects, isLoading, isError};
}