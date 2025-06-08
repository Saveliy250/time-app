import {CreateProject} from "./components/createProject/CreateProject.tsx";
import {ProjectsSideBar} from "./components/projectsSideBar/ProjectsSideBar.tsx";
import {ProjectSlide} from "pages/main/components/projectSlide/ProjectSlide.tsx";



export const MainPage = () => {


    return (
        <>
            <ProjectsSideBar/>
            <ProjectSlide/>
            <CreateProject/>
        </>
    );
};

