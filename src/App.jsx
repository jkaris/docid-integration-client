import {Route, Routes} from "react-router-dom";
import MainHead from "./components/navbar/MainHeader.jsx";
import Footer from "./components/footer/Footer.jsx";
import AddPublication from "./pages/AddPublication.jsx";
import ListPublications from "./pages/ListPublications.jsx";
import ViewPublication from "./pages/ViewPublication.jsx";
import Home from "./pages/Home.jsx";
import UserModal from "./components/modal/UserModal.jsx";
import "./App.css";
import {useState} from "react";


const routes = [
    {path: "/", exact: true, element: Home, name: "Home"},
    {path: "/add", element: AddPublication, name: "Add Publication"},
    {path: "/list", element: ListPublications, name: "List Publications"},
];

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (<>
            <MainHead routes={routes}/>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.element/>}/>
                ))}
                <Route path={"/view/:id"} element={<ViewPublication/>}/>
            </Routes>
            <Footer routes={routes}/>
        </>
    )
}

export default App;