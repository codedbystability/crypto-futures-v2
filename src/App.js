import {Provider, useSelector} from "react-redux";
import store from "./reducers/store";
import Content from "./containers/content";
import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link, Outlet,
} from "react-router-dom";
import HowToPlay from "./containers/how-to-play";
import Header from "./containers/header";
import Menu from "./containers/menu";
import './i18n/i18n'
import {ToastContainer} from "react-toastify";

function App() {


    const Layout = () => {
        return (
            <>
                <Header/>
                <Menu/>
                <Outlet/>
            </>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>, // Common layout with Header
            children: [
                {index: true, element: <Content/>},
                {path: "how-to-play", element: <HowToPlay/>},
            ],
        },
    ]);
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
            <ToastContainer
                position={'bottom-left'}
                theme={'dark'}/>
        </Provider>
    );
}

export default App;
