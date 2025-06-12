import {CreateProject} from "./components/createProject/CreateProject.tsx";
import {ProjectsSideBar} from "./components/projectsSideBar/ProjectsSideBar.tsx";
import {ProjectSlide} from "pages/main/components/projectSlide/ProjectSlide.tsx";
import {useAppSelector} from "shared/hooks/redux.ts";



export const MainPage = () => {

    const {chosenProject} = useAppSelector(state => state.project);

    return (
        <>
            <ProjectsSideBar/>
            {chosenProject  ? <ProjectSlide key={chosenProject.id} project={chosenProject}/> : null}
            <CreateProject/>
        </>
    );
};

