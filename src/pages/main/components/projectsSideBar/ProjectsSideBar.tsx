import {AppShell, Button, Skeleton} from "@mantine/core";
import {Header} from "shared/ui/Header.tsx";
import classes from "./ProjectsSideBar.module.css";
import {useGetProjects} from "entities/project/useGetProjects.ts";

export const ProjectsSideBar = () => {

    const {projects, isLoading, isError} = useGetProjects()

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
                Navbar
                <p>{isError}</p>
                {isLoading &&
                    Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={true} />
                    ))}
                {!isLoading &&
                    projects.map((project) => (
                        <Button
                            key={project.id}
                            className={classes.projectMiniCard}
                        >{project.title}</Button>
                    ))
                }
            </AppShell.Navbar>
        </AppShell>
    );
};

