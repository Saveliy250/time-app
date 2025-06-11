export interface IProject {
    id: number;
    title: string;
    description: string;
    tags: string[];
    timeToComplete: number;
    timeSpent: number;
}