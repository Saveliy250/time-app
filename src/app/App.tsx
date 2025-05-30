import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../pages/login/Login.tsx";
import "./App.css"
import {Register} from "../pages/register/Register.tsx";
import {ROUTES} from "../shared/routes.ts";

export function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTRATION} element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}