import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {useEffect} from "react";
import {getProjects} from "entities/project/ProjectSlice.ts";
import {notifications} from "@mantine/notifications";

export const useGetProjects = () => {
    const dispatch = useAppDispatch();
    const {projects, isLoading, isError, error} = useAppSelector(state => state.project);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                await dispatch(getProjects()).unwrap();
            } catch {
                notifications.show({
                    color: 'red',
                    title: 'Something went wrong :( ',
                    message: error,
                })
            }
        }
        loadProjects();
    }, [])

    return {projects, isLoading, isError, error};
}