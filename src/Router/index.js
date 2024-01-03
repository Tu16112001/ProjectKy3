import NotFoud from "../Pages/NotFoud/index";
import Home from "../Pages/home/index";
import Login from "../Pages/Login";
import { Sigup } from "../Pages/Sigup";
export const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },{
        path: '/Login',
        page: Login,
        isShowHeader: true
    },{
        path: '/Sigup',
        page: Sigup,
        isShowHeader: true
    },{
        path: '*',
        page: NotFoud
    }
]