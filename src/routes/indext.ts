import { createBrowserRouter, Navigate } from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import ProductList from "@/pages/product/ProductList";
import CartPage from "@/pages/cart/CartPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

let router = createBrowserRouter([
  {
    path: "login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DefaultLayout as React.ComponentType,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "product-list",
        Component: ProductList,
      },
      {
        path: "cart",
        Component: CartPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default router;