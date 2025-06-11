import {ProjectCard} from "pages/Analytics/components/ProjectCard.tsx";
import {useGetProjects} from "entities/project/useGetProjects.ts";
import {List} from "shared/ui/List.tsx";
import classes from "./AnalyticsPage.module.css";
import {Header} from "shared/ui/Header.tsx";
import {AppShell} from "@mantine/core";
import {useProjectsAnalytics} from "shared/hooks/useProjectsAnalytics.ts";
import {StatsRing} from "shared/ui/StatsRing.tsx";


export function AnalyticsPage() {

    const {projects} = useGetProjects()

    const {countedStats, dataForRings} = useProjectsAnalytics(projects)

    return (
        <AppShell>
            <Header/>
            <div>

            </div>
            <div className={classes.mainContainer}>
                <div>
                    <p>Всего потрачено времени: {countedStats.spentTimeSum}</p>
                    <p>Всего планировалось потратить: {countedStats.timeToCompleteSum}</p>
                    <p>Отношение затраченного времени к планируемому: {countedStats.percentage}%</p>

                </div>
                <div>
                    <StatsRing data={dataForRings}/>
                </div>
                <div className={classes.projectListContainer}>
                    <h2>Проекты</h2>
                    <List data={projects || []} renderData={(project) =>
                        <ProjectCard project={project}/>
                    }/>
                </div>
            </div>
        </AppShell>
    )
}