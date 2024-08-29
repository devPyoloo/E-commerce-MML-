import { NavLink, Outlet } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";


export default function RootLayer() {
  return (
    <>
        <header className="mx-10 fixed flex justify-between items-center">
            <img 
            src="/src/assets/logo.png" 
            alt="Logo"
            className="drop-shadow-2xl" />

          <nav className="flex items-center justify-center space-x-20 text-xl drop-shadow-xl px-5 font-semibold text-gray-800">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"about"}>About us</NavLink>
            <NavLink to={"category"}>Category</NavLink>
            <NavLink to={"contact"}>Contact</NavLink>
          </nav>
          <aside>
            <span>
              <BsHandbag className="text-4xl drop-shadow"/>
            </span>
          </aside>
        </header>

      <main className="">
        <Outlet />
      </main>
    </>
  );
}
