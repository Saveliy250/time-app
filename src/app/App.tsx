import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import "./App.css"
import Register from "../pages/register/Register.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
