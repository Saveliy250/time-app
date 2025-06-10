import {AppShell, Pill} from "@mantine/core";
import {useAppSelector} from "shared/hooks/redux.ts";
import {List} from "shared/ui/List.tsx";
import {useTimer} from "shared/hooks/useTimer.ts";

interface ProjectSlideProps {
    projectId: number;
    timeSpentValue: number;
}

export const ProjectSlide = ({projectId, timeSpentValue}: ProjectSlideProps) => {

    const {chosenProject} = useAppSelector(state => state.project);

    const {timer, toggleTimer} = useTimer(projectId, timeSpentValue);

    return (
        <div style={{
            width:"66%",
        }}>
            <AppShell>
                <AppShell.Main>
                    <h2>{chosenProject?.title}</h2>
                    <p>{timer}</p>
                    <p>{chosenProject?.timeSpent}</p>
                    <button onClick={() => toggleTimer()}></button>
                    <div>{chosenProject?.description}</div>
                    <List data={chosenProject?.tags || []} renderData={(tag) =>
                        <Pill>{tag}</Pill>
                    }/>
                </AppShell.Main>
            </AppShell>
        </div>
    );
};

