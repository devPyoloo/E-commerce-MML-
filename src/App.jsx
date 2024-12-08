import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Landing Page/Home"
import ProductDetails from "./pages/ProductDetails"
import ProductsLayer from "./layouts/ProductsLayer"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Products from "./pages/Products"
import Favourite from "./pages/Favourite"
import AddProduct from "./pages/AddProduct"
import PaymentSuccess from "./pages/PaymentSuccess"
import LoginForm from "./pages/LoginPage/LoginForm"
import RegisterForm from "./pages/LoginPage/RegisterForm"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
      <Route index element={<Home />} /> 

      <Route path="products/:category" element={<ProductsLayer />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="favourite" element={<Favourite />} />

      <Route path="add-product" element={<AddProduct />} />
      <Route path="payment-success/:stripePaymentIntentId" element={<PaymentSuccess />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
