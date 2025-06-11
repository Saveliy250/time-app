import {Center, Group, Paper, RingProgress, SimpleGrid, Text} from "@mantine/core";
import {IconArrowDownRight, IconArrowUpRight} from "@tabler/icons-react";

export interface IRingData {
    id: number;
    label: string;
    stats: string;
    progress: number;
    color: string;
    icon: "up" | "down";
}

interface RingProps {
    data: IRingData[]
}

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

export function StatsRing({data}: RingProps) {

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <Paper withBorder radius="md" p="xs" key={stat.id}>
                <Group>
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
        );
    });
    return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}