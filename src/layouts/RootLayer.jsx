import { NavLink, Outlet } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";

export default function RootLayer() {
  return (
    <>
      <header className="group relative flex justify-center items-center">
        <div className="absolute inset-0 bg-white transform -translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out z-0 rounded-b-2xl"></div>

        <nav className="mt-7 w-full flex items-center justify-center space-x-40 text-xl drop-shadow-xl px-5 pb-8 font-semibold text-gray-700 z-10">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"about"}>About us</NavLink>
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="drop-shadow-2xl"
          />
          <NavLink to={"category"}>Products</NavLink>
          <BsHandbag className="text-4xl drop-shadow" />
        </nav>
      </header>

      <main className="">
        <Outlet />
      </main>
    </>
  );
}
