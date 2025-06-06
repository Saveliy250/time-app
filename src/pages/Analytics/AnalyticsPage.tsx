import {IconArrowDownRight, IconArrowUpRight} from '@tabler/icons-react';
import {AppShell, Center, Group, Paper, RingProgress, SimpleGrid, Text} from '@mantine/core';
import {Header} from "shared/ui/Header.tsx";
import {ProjectCard} from "pages/Analytics/components/ProjectCard.tsx";
import {useGetProjects} from "entities/project/useGetProjects.ts";
import {List} from "shared/ui/List.tsx";
import classes from "./AnalyticsPage.module.css";

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

const data = [
    {label: 'Часов потрачено', stats: '0', progress: 0, color: 'teal', icon: 'up'},
    {label: 'Задач выполнено', stats: '0', progress: 0, color: 'blue', icon: 'up'},
    {
        label: 'Рилсов просмотрено',
        stats: '1,543,652',
        progress: 83,
        color: 'red',
        icon: 'down',
    },
] as const;

export function AnalyticsPage() {

    const {projects} = useGetProjects()


    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <AppShell>
                <Paper withBorder radius="md" p="xs" key={stat.label}>
                    <Header/>
                    <Group style={{paddingTop: "40px"}}>
                        <RingProgress
                            size={80}
                            roundCaps
                            thickness={8}
                            sections={[{value: stat.progress, color: stat.color}]}
                            label={
                                <Center>
                                    <Icon size={20} stroke={1.5}/>
                                </Center>
                            }
                        />

                        <div>
                            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                                {stat.label}
                            </Text>
                            <Text fw={700} size="xl">
                                {stat.stats}
                            </Text>
                        </div>
                    </Group>
                </Paper>
            </AppShell>
        );
    });

    //<SimpleGrid cols={{base: 1, sm: 3}}>{stats}</SimpleGrid>;

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