import {AppShell, Pill} from "@mantine/core";
import {useAppSelector} from "shared/hooks/redux.ts";
import {List} from "shared/ui/List.tsx";

export const ProjectSlide = () => {

    const {chosenProject} = useAppSelector(state => state.project);

    return (
        <div style={{
            width:"66%",
        }}>
            <AppShell>
                <AppShell.Main>
                    <h2>{chosenProject?.title}</h2>
                    <div>{chosenProject?.description}</div>
                    <List data={chosenProject?.tags || []} renderData={(tag) =>
                        <Pill>{tag}</Pill>
                    }/>
                </AppShell.Main>
            </AppShell>
        </div>
    );
};

