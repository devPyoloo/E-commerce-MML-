import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { BsPaypal } from "react-icons/bs";
import { FaLock, FaCcVisa, FaCcMastercard, FaAlipay } from "react-icons/fa";

export default function ProductCart() {
  const {
    cart,
    updateCartQuantity,
    removeCartProduct,
    addtoFavourite,
    favourite,
  } = useStore((state) => ({
    cart: state.cart,
    updateCartQuantity: state.updateCartQuantity,
    removeCartProduct: state.removeCartProduct,
    addtoFavourite: state.addtoFavourite,
    favourite: state.favourite,
  }));

  const arrayFavourite = Array.isArray(favourite) ? favourite : [];

  const subTotal = useMemo(() => {
    return cart.reduce((start, item) => start + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <div className="mb-40 pt-32 mx-20">
          <section className="flex flex-wrap justify-between items-start">
            <div className="flex flex-col w-1/2">
              <h1 className="text-3xl font-semibold">Your Bag</h1>
              {cart.map((item) => (
                <figure
                  className="flex justify-between items-start border-b border-b-gray-200 py-10"
                  key={item.id}
                >
                  <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56">
                    <img
                      className={`2xl:w-28 w-20 object-center drop-shadow-lg"
                    }`}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="relative w-1/2 flex flex-col items-start gap-y-10 2xl:text-xl text-lg">
                    <div className="flex flex-col gap-y-3">
                      <label className="font-semibold truncate w-full">
                        {item.name}
                      </label>
                      <label className="text-gray-700">{item.category}</label>
                      <div className="text-gray-700 flex gap-x-6 py-3">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="bg-mutedgray px-2 hover:opacity-80"
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="bg-mutedgray px-2 hover:opacity-80"
                        >
                          +
                        </button>
                      </div>
                      <label className="text-xl font-semibold">
                        $ {item.price}
                      </label>
                    </div>

                    <div className="flex justify-between w-20 text-3xl text-lightgray">
                      <button
                        onClick={() => {
                          addtoFavourite(item);
                        }}
                      >
                        {arrayFavourite.some(
                          (product) => product.id === item.id
                        ) ? (
                          <IoMdHeart className="font-bold text-3xl fill-red-600" />
                        ) : (
                          <IoMdHeartEmpty className="font-bold text-3xl" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          removeCartProduct(item.id);
                        }}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <aside className="w-1/3">
              <div className="flex flex-col gap-4 text-xl">
                <h1 className="text-2xl font-medium">Order Summary</h1>
                <p className="flex justify-between w-full">
                  SubTotal: <span>${subTotal.toFixed(2)}</span>
                </p>

                <div>
                  <p className="flex justify-between w-full">
                    Standard Shipping: <span>Free</span>
                  </p>
                  <p className="text-base text-lightgray">
                    Estimated delivery 2 - 5 working days
                  </p>
                </div>

                <p className="flex justify-between w-full border-y border-y-mutedgray py-4 my-10">
                  Total: <span>${subTotal.toFixed(2)}</span>
                </p>
              </div>

              <div className="w-full flex flex-col gap-5 mt-20 mb-10">
                <Link to={"/checkout"}>
                  <Button buttonType={"primary"}>Checkout</Button>
                </Link>

                <Link to={"/products/All"}>
                  <Button buttonType={"secondary"}>Continue shopping</Button>
                </Link>

                <button className=""></button>
              </div>
            </aside>
          </section>
          <div className="flex justify-between border border-mutedgray shadow py-6 px-8 mt-32">
            <div className="flex justify-between gap-x-8">
              <p className="flex items-center gap-x-3">
                <span className="text-2xl">
                  <PiShieldCheckeredFill />
                </span>
                Privacy Protection
              </p>
              <p className="flex items-center gap-x-3">
                <span className="text-2xl">
                  <FaLock />
                </span>
                Secure Payments
              </p>
              <p>Available payment methods</p>
            </div>
            <div className="flex justify-between gap-x-6 text-3xl">
              <span>
                <FaCcVisa />
              </span>
              <span>
                <FaCcMastercard />
              </span>
              <span>
                <FaAlipay />
              </span>
              <span>
                <BsPaypal />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96 w-full">
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-center mb-8">
              YOUR BAG IS EMPTY
            </p>
            <div className="flex justify-between gap-7">
              <Link to={"/products/All"}>
                <button className="bg-lightblack rounded-sm text-white text-xl py-2 px-4">
                  Discover Products
                </button>
              </Link>
              <Link to={"/"}>
                <button className="rounded-sm text-lightgray border border-lightgray text-xl py-2 px-4">
                  Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
