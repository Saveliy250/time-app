import {CreateProject} from "./components/createProject/CreateProject.tsx";
import {ProjectsSideBar} from "./components/projectsSideBar/ProjectsSideBar.tsx";

export const MainPage = () => {


    return (
        <>
            <ProjectsSideBar/>
            <CreateProject/>
        </>
    );
};

