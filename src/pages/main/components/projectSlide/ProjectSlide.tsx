import {AppShell, Button, Pill} from "@mantine/core";
import {List} from "shared/ui/List.tsx";
import {useProjectTimer} from "shared/hooks/useProjectTimer.ts";
import {PauseIco} from "shared/ui/icons/PauseIco.tsx";
import {PlayIco} from "shared/ui/icons/PlayIco.tsx";
import type {IProject} from "entities/project/IProject.ts";

interface ProjectSlideProps {
    project: IProject;
}

export const ProjectSlide = ({project}: ProjectSlideProps) => {


    const {toggleTimer, hours, minutes, seconds, isRunning} = useProjectTimer(project.id, project.timeSpent);

    return (
        <div style={{
            width:"66%",
        }}>
            <AppShell>
                <AppShell.Main>
                    <h2>{project.title}</h2>
                    <p>{hours}:{minutes}:{seconds}</p>
                    <Button onClick={() => toggleTimer()}>
                        {isRunning ? <PauseIco/> : <PlayIco/>}
                    </Button>
                    <div>{project.description}</div>
                    <List data={project.tags || []} renderData={(tag) =>
                        <Pill>{tag}</Pill>
                    }/>
                </AppShell.Main>
            </AppShell>
        </div>
    );
};

