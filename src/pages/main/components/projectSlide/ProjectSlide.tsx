import {AppShell, Button, Pill} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux.ts";
import {List} from "shared/ui/List.tsx";
import {PlayIco} from "shared/ui/icons/PlayIco.tsx";
import {endTimer, startTimer} from "entities/timer/TimerSlice.ts";
import {PauseIco} from "shared/ui/icons/PauseIco.tsx";

export const ProjectSlide = () => {

    const {chosenProject} = useAppSelector(state => state.project);

    const dispatch = useAppDispatch();
    const {timers} = useAppSelector(state => state.timer);
    const {chosenProject} = useAppSelector(state => state.project);

    let timer = {}

    if (chosenProject !== null) {
        timer = timers.find(t => t.id === chosenProject.id);
    }

    const handleButtonClick = () => {
        if (chosenProject.id == null) return;
        if (isRunning) {
            dispatch(endTimer(Date.now(), chosenProject?.id));
        } else {
            dispatch(startTimer(Date.now()));
        }
    };

    return (
        <div style={{
            width:"66%",
        }}>
            <AppShell>
                <AppShell.Main>
                    <h2>{chosenProject?.title}</h2>
                    <p>{timeSpent}</p>
                    {chosenProject &&
                        <Button onClick={handleButtonClick}>
                            {isRunning ? <PauseIco/> : <PlayIco/>}
                        </Button>
                    }
                    <div>{chosenProject?.description}</div>
                    <List data={chosenProject?.tags || []} renderData={(tag) =>
                        <Pill>{tag}</Pill>
                    }/>
                </AppShell.Main>
            </AppShell>
        </div>
    );
};

