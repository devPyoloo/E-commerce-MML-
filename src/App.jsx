import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Landing Page/Home"
import ProductDetails from "./pages/ProductDetails"
import ProductsLayer from "./layouts/ProductsLayer"
import ProductCart from "./pages/ProductCart"
import Checkout from "./pages/Checkout"
import Products from "./components/Landing Page/Products"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route index element={<Home />} /> 

      <Route path="/products/:category" element={<ProductsLayer />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="cart" element={<ProductCart />} />
      <Route path="checkout" element={<Checkout />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
