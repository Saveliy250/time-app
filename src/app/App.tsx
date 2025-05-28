import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login/Login.tsx";
import "./App.css"

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
