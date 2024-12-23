import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayer from "./layouts/RootLayer";
import Home from "./components/Landing Page/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductsLayer from "./layouts/ProductsLayer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Favourite from "./pages/Favourite";
import AddProduct from "./pages/AddProduct";
import PaymentSuccess from "./pages/PaymentSuccess";
import LoginForm from "./pages/LoginPage/LoginForm";
import RegisterForm from "./pages/LoginPage/RegisterForm";
import ProtectedRoute from "./layouts/ProtectedRoute";
import ViewOrders from "./pages/ViewOrders";
import AdminDashboard from "./pages/AdminDashboard";
import LogoutForm from "./pages/LoginPage/LogoutForm";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="logout" element={<LogoutForm />} />
      <Route index element={<Home />} />

      <Route path="admin-dashboard" element={<AdminDashboard />} />

      <Route path="products/:category" element={<ProductsLayer />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="cart" element={<Cart />} />

      {/* Protected Routes (authenticated user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="favourite" element={<Favourite />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment-success/:stripePaymentIntentId" element={<PaymentSuccess />} />
        <Route path="view-orders" element={<ViewOrders />} />
      </Route>

      <Route path="add-product" element={<AddProduct />} />
      <Route path="admin-dashboard" element={<AdminDashboard />} />

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
