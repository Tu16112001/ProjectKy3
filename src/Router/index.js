import NotFoud from "../Pages/NotFoud/index";
import Home from "../Pages/home/index";
import Login from "../Pages/Login";
import { Sigup } from "../Pages/Sigup";
import { Products } from "../Pages/Products";
import { ProductDetail } from "../Pages/ProductDetail";
import {Cart} from "../Pages/Cart/index";
import { Edit } from "../Pages/Edit";
import { CheckOut } from "../Pages/Checkout";
import { DeleteCart } from "../Pages/DeleteCart";
import { MyOrder } from "../Pages/MyOrder";
import {ContactPage} from "../Pages/Contact";
import {History} from '../Pages/History'
import ViewDetail from "../Pages/ViewDetail";
import ViewHistoy from "../Pages/viewHistory";
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
        path:'/Products',
        page: Products,
        isShowHeader:true
    },{
        path:'/ProductDetail/:id',
        page: ProductDetail,
        isShowHeader:true
    },{
        path:'/Cart',
        page: Cart,
        isShowHeader:true
    },{
        path:'/CheckOut',
        page: CheckOut,
        isShowHeader:false
    },{
        path:'/DeleteCart',
        page: DeleteCart,
        isShowHeader:true}
        
    ,{ path:'/Edit',
    page: Edit,
    isShowHeader:true}
    ,{
        path:'/My-Order',
    page: MyOrder,
    isShowHeader:true
    },{
        path:'/contact',
        page: ContactPage,
        isShowHeader:true
    },{
        path:'/history',
        page: History,
        isShowHeader:true
    },{
        path:'/ViewDetail/:id',
        page: ViewDetail,
        isShowHeader:true
    },{
        path:'/ViewHistory/:id',
        page: ViewHistoy,
        isShowHeader:true
    },{
        path: '*',
        page: NotFoud
    }
]