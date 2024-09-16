import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";


export default function RootLayer() {


  return (
    <>
      <Header />
      <Toaster />
      <main className="mt-40">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}