import type {IRingData} from "shared/ui/StatsRing.tsx";
import type {IProject} from "entities/project/IProject.ts";


interface ICountedStats {
    spentTimeSum : number;
    timeToCompleteSum : number;
    percentage: number;

}

export const useProjectsAnalytics = (projects: IProject[]) => {



    const makeProjectStatsForRings= (projects: IProject[]): IRingData[]  => {

        const result: IRingData[] = []

        projects.forEach(project => {
            result.push({
                id: project.id,
                label: project.title,
                color: 'teal',
                stats: project.timeSpent.toString(),
                progress: project.timeSpent / project.timeToComplete * 100,
                icon: 'up'
            })
        })

        return result
    }

    const countStats = (projects: IProject[]): ICountedStats => {
        let spentTimeSum = 0
        let timeToCompleteSum = 0
        projects.forEach(project => {
            spentTimeSum += project.timeSpent
            timeToCompleteSum += project.timeToComplete
        })

        const percentage = Math.round(spentTimeSum / timeToCompleteSum * 100)

        return {spentTimeSum, timeToCompleteSum, percentage}
    }

    const dataForRings = makeProjectStatsForRings(projects)
    const countedStats = countStats(projects)

    return {
        countedStats,
        dataForRings
    }

}