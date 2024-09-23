import { NavLink } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types'



export default function Header({ aboutRef }) {
  const [onScroll, setOnScroll] = useState({
    showBg: false,
    showNav: true,
  });
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, favourite } = useStore((state) => ({
    cart: state.cart,
    favourite: state.favourite,
  }));

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const cartTotal = cart.reduce((start, item) => start + item.quantity, 0);

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

  const menuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };
  return (
    <header className="fixed top-0 left-0 right-0 group flex justify-center items-center z-20">
      <div
        className={`absolute inset-0 bg-white shadow-md transform -translate-y-full ${
          onScroll.showBg ? "translate-y-0" : ""
        }  transition-transform duration-200 ease-in-out z-0 rounded-b-2xl`}
      ></div>

      {/* MOBILE NAVIGATION */}
      <nav
        className={`${
          onScroll.showNav ? "opacity-100" : "opacity-0"
        } mt-7 w-full flex items-center justify-between font-lora text-xl px-5 pb-8 font-medium text-lightblack z-10 md:hidden`}
      >
        <div className="flex justify-center items-center gap-x-3">
          <NavLink to={"favourite"} className="relative">
            <IoMdHeartEmpty className="text-4xl drop-shadow" />
            {favourite.length > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-3 bg-satpink text-white text-sm">
                {favourite.length}
              </span>
            )}
          </NavLink>

          <NavLink to={"cart"} className="relative">
            <BsHandbag className="text-4xl drop-shadow" />
            {cartTotal > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-2 bg-satpink text-white text-sm">
                {cartTotal}
              </span>
            )}
          </NavLink>
        </div>

        {/* LOGO */}
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="drop-shadow-2xl w-32 lg:w-60"
          loading="lazy"
        />

        {/* HAMBURGER MENU TOGGLE */}
        <button
          className="text-3xl lg:text-5xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </motion.div>
        </button>

        {/* ANIMATED MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="absolute grid grid-cols-1 py-7 justify-items-center gap-y-5 top-24 left-0 right-0 bg-mutedgray shadow-2xl mx-5 font-semibold"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0,
                }}
              >
                <NavLink onClick={() => setMenuOpen(prev => !prev)} to={"/"}>
                Home
                </NavLink>
                
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <NavLink onClick={() => { setMenuOpen(prev => !prev); scrollToAbout
               }}>
                About Us
                </NavLink>
                
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
               <NavLink onClick={() => setMenuOpen(prev => !prev)} to={"products/All"}>
                Products
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* DESKTOP NAVIGATION */}
      <nav
        className={`${
          onScroll.showNav ? "opacity-100" : "opacity-0"
        } mt-7 w-full md:flex items-center justify-center space-x-40 font-lora text-xl px-5 pb-8 font-medium text-lightblack z-10 hidden`}
      >
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"about"}>About us</NavLink>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="drop-shadow-2xl"
          loading="lazy"
        />
        <NavLink to={"products/All"}>Products</NavLink>

        <div className="flex justify-center items-center gap-x-7">
          <NavLink to={"favourite"} className="relative">
            <IoMdHeartEmpty className="lg:text-4xl drop-shadow" />
            {favourite.length > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-3 bg-satpink text-white text-sm">
                {" "}
                {favourite.length}
              </span>
            )}
          </NavLink>

          <NavLink to={"cart"} className="relative">
            <BsHandbag className="lg:text-4xl drop-shadow" />
            {cartTotal > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-2 bg-satpink text-white text-sm">
                {" "}
                {cartTotal}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  aboutRef: PropTypes.object.isRequired
}