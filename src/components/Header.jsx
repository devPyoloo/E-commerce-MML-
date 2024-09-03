import { NavLink } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Header() {
  const [onScroll, setOnScroll] = useState({
    showBg: false,
    showNav: true,
  });
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos === 0) {
        setOnScroll({ showBg: false, showNav: true });
      } else if (currentScrollPos < prevScrollPos) {
        setOnScroll({ showBg: true, showNav: true });
      } else {
        setOnScroll({ showBg: false, showNav: false });
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header className="fixed top-0 left-0 right-0 group flex justify-center items-center z-10">
    <div
      className={`absolute inset-0 bg-white shadow-md transform -translate-y-full ${
        onScroll.showBg ? "translate-y-0" : "group-hover:translate-y-0"
      } transition-transform duration-200 ease-in-out z-0 rounded-b-2xl`}
    ></div>

    <nav
      className={`${
        onScroll.showNav ? "opacity-100" : "opacity-0"
      } mt-7 w-full flex items-center justify-center space-x-40 font-lora text-xl px-5 pb-8 font-medium text-gray-800 z-10`}
    >
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"about"}>About us</NavLink>
      <img
        src="/src/assets/logo.png"
        alt="Logo"
        className="drop-shadow-2xl"
        loading="lazy"
      />
      <NavLink to={"products"}>Products</NavLink>
      <BsHandbag className="text-4xl drop-shadow" />
    </nav>
  </header>
  );
}
