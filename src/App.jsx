import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./components/Home"
import ProductsList from "./pages/ProductsList"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path={"/"} element={<RootLayer />}>
      <Route path={"/"} element={<Home />} /> 
      <Route path={"products"} element={<ProductsList />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
