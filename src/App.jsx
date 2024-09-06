import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Home"
import ProductsList from "./pages/ProductsList"
import ProductDetails, { productDetailsLoader } from "./pages/ProductDetails"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<RootLayer />}>
      <Route index element={<Home />} /> 
      <Route path="products" element={<ProductsList />} >
        <Route path=":id" element={<ProductDetails />} loader={productDetailsLoader} />
      </Route>
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
