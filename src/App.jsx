import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayer from "./layouts/RootLayer"
import Home from "./pages/Home"


const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path={"/"} element={<RootLayer />}>
      <Route path={"/"} element={<Home />} />
    </Route> 
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
