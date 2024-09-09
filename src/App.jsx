import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Landing Page/Home"
import ProductsList from "./pages/ProductsList"
import ProductDetails from "./pages/ProductDetails"
import ProductsLayer from "./layouts/ProductsLayer"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route index element={<Home />} /> 

      <Route path="products" element={<ProductsLayer />}>
        <Route index element={<ProductsList />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
