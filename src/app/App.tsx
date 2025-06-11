import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../pages/login/Login.tsx";
import "./App.css"
import {Register} from "../pages/register/Register.tsx";
import {ROUTES} from "../shared/routes.ts";
import {MainPage} from "../pages/main/MainPage.tsx";
import {AnalyticsPage} from "pages/Analytics/AnalyticsPage.tsx";
import {ProfilePage} from "pages/profile/ProfilePage.tsx";
import {ProtectedRoute} from "app/utils/ProtectedRoute.tsx";

export function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTRATION} element={<Register/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path={ROUTES.MAIN} element={<MainPage/>}/>
                    <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage/>}/>
                    <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}