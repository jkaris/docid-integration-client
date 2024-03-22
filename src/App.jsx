import {Route, Routes} from "react-router-dom";
import MainHead from "./components/MainHeader.jsx";
import Footer from "./components/Footer.jsx";
import AddPublication from "./pages/AddPublication.jsx";
import ListPublications from "./pages/ListPublications.jsx";
import ViewPublication from "./pages/ViewPublication.jsx";
import Home from "./pages/Home.jsx";
import { Image, Spinner } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import logo from "./assets/docid_logo_loading.png";


const routes = [
    {path: "/", exact: true, element: Home, name: "Home"},
    {path: "/add", element: AddPublication, name: "Add Publication"},
    {path: "/list", element: ListPublications, name: "List Publications"},
];

const Loading = () => {
    return (
        <div className="loading-container d-flex align-items-center justify-content-center">
        <Spinner className="text-center" animation="grow" variant="primary" style={{
            width: "300px",
            height: "300px",
            margin: "auto",
            display: "block",
            visibility: "hidden"
        }}>
            <Image src={logo} alt="Africa PID Alliance" style={{
                visibility: "visible"
            }}/>
        </Spinner>
        </div>
    );
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>

            {loading ? (
                <Loading />
            ) : (
                <>
                <MainHead routes={routes}/>
                <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={<route.element/>}/>
                ))}
                <Route path={"/view/:id"} element={<ViewPublication/>}/>
                </Routes>
                <Footer routes={routes}/>
                </>
                )}
        </>
    )
}

export default App;
