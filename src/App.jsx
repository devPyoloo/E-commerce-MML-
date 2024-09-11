import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Landing Page/Home"
import ProductsList from "./pages/ProductsList"
import ProductDetails from "./pages/ProductDetails"
import ProductsLayer from "./layouts/ProductsLayer"
import ProductCart from "./pages/ProductCart"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route index element={<Home />} /> 

      <Route path="/products/:category" element={<ProductsLayer />}>
        <Route index element={<ProductsList />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>

      <Route path="cart" element={<ProductCart />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
