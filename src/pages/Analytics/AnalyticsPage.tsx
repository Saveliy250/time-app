import {ProjectCard} from "pages/Analytics/components/ProjectCard.tsx";
import {useGetProjects} from "entities/project/useGetProjects.ts";
import {List} from "shared/ui/List.tsx";
import classes from "./AnalyticsPage.module.css";




export function AnalyticsPage() {

    const {projects} = useGetProjects()
    console.log(projects)





    return (
        <>
            <h2>Проекты</h2>
            <div className={classes.projectListContainer}>
                <List data={projects || []} renderData={(project) =>
                    <ProjectCard project={project}/>
                }/>
            </div>
        </>
    )
}