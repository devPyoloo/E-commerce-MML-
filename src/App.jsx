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


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route index element={<Home />} /> 

      <Route path="products/:category" element={<ProductsLayer />}>
        <Route index element={<Products />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="favourite" element={<Favourite />} />

      <Route path="add-product" element={<AddProduct />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
