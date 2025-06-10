import {CreateProject} from "./components/createProject/CreateProject.tsx";
import {ProjectsSideBar} from "./components/projectsSideBar/ProjectsSideBar.tsx";
import {ProjectSlide} from "pages/main/components/projectSlide/ProjectSlide.tsx";
import {useAppSelector} from "shared/hooks/redux.ts";



export const MainPage = () => {

    const {chosenProject} = useAppSelector(state => state.project);

    return (
        <>
            <ProjectsSideBar/>
            {chosenProject && chosenProject.id ? <ProjectSlide key={chosenProject.id} projectId={chosenProject.id} timeSpentValue={chosenProject.timeSpent}/> : null}
            <CreateProject/>
        </>
    );
};

