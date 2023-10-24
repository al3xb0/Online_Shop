import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    ADMIN_USER_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import AdminUserPage from "./pages/AdminUserPage";

export  const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export  const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_USER_ROUTE,
        Component: AdminUserPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]