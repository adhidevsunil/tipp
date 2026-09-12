import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import {
  HomePage,
  ProductListingPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  OrdersPage,
  CouponsPage,
  NotFound,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "plants", Component: ProductListingPage },
      { path: "plants/:category", Component: ProductListingPage },
      { path: "product/:id", Component: ProductDetailPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "orders", Component: OrdersPage },
      { path: "coupons", Component: CouponsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);