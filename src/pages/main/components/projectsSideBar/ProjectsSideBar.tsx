import {AppShell, Button, Skeleton} from "@mantine/core";
import {Header} from "shared/ui/Header/Header.tsx";
import classes from "./ProjectsSideBar.module.css";
import {useGetProjects} from "entities/project/useGetProjects.ts";
import {useAppDispatch} from "shared/hooks/redux.ts";
import {setChosenProject} from "entities/project/ProjectSlice.ts";
import {List} from "shared/ui/List.tsx";

export const ProjectsSideBar = () => {

    const dispatch = useAppDispatch();
    const {projects, isLoading} = useGetProjects()


    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
            }}
            padding="md"
        >
            <Header />
            <AppShell.Navbar p="md">
                {isLoading &&
                    Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={true} />
                    ))}
                {!isLoading &&
                    <List data={projects} renderData={(project) => (
                        <Button
                            key={project.id}
                            color={'grey'}
                            className={classes.projectMiniCard}
                            onClick={() => {
                                dispatch(setChosenProject(project));
                                if (project.id == null) return;

                            }}
                        >{project.title}</Button>
                    )}/>
                }
            </AppShell.Navbar>
        </AppShell>
    );
};

