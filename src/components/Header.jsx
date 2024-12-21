import { NavLink, useNavigate } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoChevronDownSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdAddBusiness } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../store/useAuthStore";
import { useModalStore } from "../store/useModalStore";

export default function Header({ aboutRef }) {
  const [onScroll, setOnScroll] = useState({
    showBg: false,
    showNav: true,
  });
  const { setIsOpen } = useModalStore.getState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cart, favourite } = useStore((state) => ({
    cart: state.cart,
    favourite: state.favourite,
  }));
  const navigate = useNavigate();
  const { roles, user } = useAuthStore.getState();

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
      x: "100%",
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      x: "0%",
      height: "100vh",
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };

  const profileVariants = {
    hidden: {
      x: "100%",
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      x: "0%",
      height: "100vh",
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
            <IoMdHeartEmpty className="text-4xl text-lightblack" />
            {favourite.length > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-3 bg-satpink text-white text-sm">
                {favourite.length}
              </span>
            )}
          </NavLink>

          <NavLink to={"cart"} className="relative">
            <BsHandbag className="text-4xl text-lightblack" />
            {cartTotal > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-2 bg-satpink text-white text-sm">
                {cartTotal}
              </span>
            )}
          </NavLink>
        </div>

        {/* LOGO */}
        <img
          src="https://res.cloudinary.com/du1mw6ozf/image/upload/v1733220599/logo_spm0hd.png"
          alt="Logo"
          className="drop-shadow-2xl w-32 lg:w-60"
          loading="lazy"
        />

        {/* HAMBURGER MENU TOGGLE */}
        <button
          className="text-3xl lg:text-5xl z-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {menuOpen ? (
              <HiOutlineX className={`${menuOpen} text-extraLightGray`} />
            ) : (
              <HiOutlineMenu />
            )}
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
              className="absolute flex flex-col items-end pt-40 pr-4 py-7 justify-items-center gap-y-4 top-0 left-36 right-0 bottom-0 bg-lightblack text-extraLightGray shadow-2xl font-semibold"
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
                <NavLink onClick={() => setMenuOpen((prev) => !prev)} to={"/"}>
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
                <NavLink
                  onClick={() => {
                    setMenuOpen((prev) => !prev);
                    scrollToAbout;
                  }}
                >
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
                <NavLink
                  onClick={() => setMenuOpen((prev) => !prev)}
                  to={"products/All"}
                >
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
          src="https://res.cloudinary.com/du1mw6ozf/image/upload/v1733220599/logo_spm0hd.png"
          alt="Logo"
          className="drop-shadow-2xl"
          loading="lazy"
        />

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-center items-center gap-x-1.5 rounded-md px-3 py-2">
              Products
              <IoChevronDownSharp
                aria-hidden="true"
                className="-mr-1 h-5 w-5"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute -left-14 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div>
              <MenuItem>
                <span
                  className="flex p-3 gap-x-2 font-lora text-base text-lightgray data-[focus]:bg-gray-100 hover:cursor-pointer"
                  onClick={() => navigate("products/All")}
                >
                  <AiFillProduct className="text-xl" />
                  List Products
                </span>
              </MenuItem>
              {roles.includes("ROLE_ADMIN") && (
                <MenuItem>
                  <span
                    className="flex p-3 gap-x-2 font-lora text-base text-lightgray data-[focus]:bg-gray-100  hover:cursor-pointer"
                    onClick={() => navigate("add-product")}
                  >
                    <MdAddBusiness className="text-xl" />
                    Add Product
                  </span>
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Menu>

        <div className="flex justify-center items-center gap-x-7">
          <NavLink to={"favourite"} className="relative">
            <IoMdHeartEmpty className="text-lightblack lg:text-4xl" />
            {favourite.length > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-3 bg-satpink text-white text-sm">
                {favourite.length}
              </span>
            )}
          </NavLink>

          <NavLink to={"cart"} className="relative">
            <BsHandbag className="text-lightblack lg:text-4xl" />
            {cartTotal > 0 && (
              <span className="absolute rounded-full px-2 -top-2 -right-2 bg-satpink text-white text-sm">
                {cartTotal}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`relative z-10`}
          >
            <CgProfile
              className={`${
                profileOpen ? "text-extraLightGray" : "text-lightblack"
              }  lg:text-4xl`}
            />
            {profileOpen && (
              <span className="absolute rounded-sm top-1 right-20 font-semibold text-white text-lg">
                {user.toUpperCase()}
              </span>
            )}
          </button>

          {/* ANIMATED PROFILE NAV */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                key="menu"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={profileVariants}
                className="absolute flex flex-col items-end pr-16 pt-40 gap-y-8 top-0 left-3/4 right-0 bottom-0 bg-lightblack text-extraLightGray font-light"
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
                  <NavLink
                    className="hover:border-b-2"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    to={"/"}
                  >
                    Profile Overview
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
                  <NavLink
                    to={"view-orders"}
                    className="hover:border-b-2"
                    onClick={() => {
                      setProfileOpen((prev) => !prev);
                      scrollToAbout;
                    }}
                  >
                    View Orders
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
                  <NavLink
                    className="hover:border-b-2"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    to={"products/All"}
                  >
                    Order History
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
                  <NavLink
                    to={"logout"}
                    className="hover:border-b-2"
                    onClick={() => {
                      setProfileOpen((prev) => !prev);
                      setIsOpen(true);
                    }}
                  >
                    Logout
                  </NavLink>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  aboutRef: PropTypes.object.isRequired,
};
