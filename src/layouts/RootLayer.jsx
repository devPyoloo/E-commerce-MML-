import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useRef } from "react";


export default function RootLayer() {
  const aboutRef = useRef(null)


  return (
    <>
      <Header aboutRef={aboutRef} />
      <Toaster />
      <main className="mt-40">
        <Outlet context={{aboutRef}} />
      </main>
      <Footer />
    </>
  );
}