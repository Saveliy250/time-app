import classes from './ProjectCard.module.css';
import type {IProject} from "entities/project/IProject.ts";
import {List} from "shared/ui/List.tsx";
import {Pill} from "@mantine/core";
import {ApartmentIco} from 'shared/ui/icons/ApartmentIco.tsx'

interface ProjectCardProps {
    project: IProject;
}

export const ProjectCard = ({project}: ProjectCardProps) => {
    return (
        <div className={classes.projectCard}>
            <ApartmentIco />
            <p className={classes.projectTitle}>{project.title}</p>
            <div className={classes.projectTags}>
                <List data={project?.tags.slice(0, 3) || []} renderData={(tag) =>
                    <Pill>{tag}</Pill>
                }/>
            </div>

        </div>
    );
};

