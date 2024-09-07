import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


export default function RootLayer() {


  return (
    <>
      <Header />
      <main className="mt-40">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}