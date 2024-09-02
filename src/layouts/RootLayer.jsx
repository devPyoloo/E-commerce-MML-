import Header from "../pages/Header";
import { Outlet } from "react-router-dom";


export default function RootLayer() {


  return (
    <>
      <Header />

      <main className="mt-36">
        <Outlet />
      </main>
    </>
  );
}
