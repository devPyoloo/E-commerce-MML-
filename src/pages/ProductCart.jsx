import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { IoMdHeartEmpty, IoIosArrowDown } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

export default function ProductCart() {
  const cart = useStore((state) => state.cart);

  const subTotal = useMemo(() => {
    return cart.reduce((start, item) => start + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <section className="flex flex-wrap justify-evenly items-start mb-40 pt-32">
          <div className="flex flex-col w-5/12">
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
                      <label className="text-gray-700 flex gap-x-6">
                        Quantity: {item.quantity}{" "}
                        <span>
                          <IoIosArrowDown />
                        </span>
                      </label>
                      <label className="text-xl font-semibold">
                      $ {item.price}
                    </label>
                    </div>

                  <div className="flex justify-between w-20 text-3xl text-lightgray">
                    <IoMdHeartEmpty />
                    <GoTrash />
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <aside className="w-1/4">
            <div className="flex flex-col gap-4 text-xl">
              <h1 className="text-2xl font-medium">Order Summary</h1>
              <p className="flex justify-between w-full">
                SubTotal: <span>${subTotal.toFixed(2)}</span>{" "}
              </p>

              <div>
                <p className="flex justify-between w-full">
                  Standard Shipping: <span>Free</span>{" "}
                </p>
                <p className="text-base text-lightgray">
                  Estimated delivery 2 - 5 working days
                </p>
              </div>

              <p className="flex justify-between w-full">
                Total: <span>${subTotal.toFixed(2)}</span>{" "}
              </p>
            </div>

            <div className="w-full flex flex-col gap-5 mt-20 mb-10">
              <button className="w-full bg-mutedblack rounded-full text-white text-xl py-6 hover:opacity-90">
                Checkout
              </button>
              <button className="w-full flex justify-center items-center gap-4 rounded-full text-lightgray border-2 border-lighgray text-xl py-6 hover:border-black">
                Continue shopping
              </button>
            </div>
          </aside>
        </section>
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
