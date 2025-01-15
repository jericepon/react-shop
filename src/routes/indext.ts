import DefaultLayout from "@/layouts/DefaultLayout";
import LoginPage from "@/pages/auth/LoginPage";
import CartPage from "@/pages/cart/CartPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductList from "@/pages/product/ProductList";
import { createBrowserRouter } from "react-router";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";

let router = createBrowserRouter([
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "",
        Component: HomePage,
        index: true,
      },
      {
        path: "product-list",
        Component: ProductList,
      },
      {
        path: "cart",
        Component: () => (ProtectedRouteWrapper(CartPage)),
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;