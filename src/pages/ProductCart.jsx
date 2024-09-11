import { useMemo } from "react";
import { useCartStore } from "../store/useCartStore";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoTrash } from "react-icons/go";

export default function ProductCart() {
  const cart = useCartStore((state) => state.cart);

  const subTotal = useMemo(() => {
    return cart.reduce((start, item) => start + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <section className="flex flex-wrap justify-evenly items-start mx-20 mb-40 pt-32">
          <div className="flex flex-col w-1/2">
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

                <div className="relative w-1/2 flex flex-col items-start gap-y-1">
                  <div className="flex flex-col">
                    <label className="font-semibold truncate w-full">
                      {item.name}
                    </label>
                    <label className="text-gray-700">{item.category}</label>
                    <label className="text-gray-700">
                      Stock left: {item.quantity}
                    </label>
                    <label className="flex justify-between items-center">
                      $ {item.price}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      <IoMdHeartEmpty />
                    </span>
                    <span>
                      <GoTrash />
                    </span>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <aside className="flex flex-col w-1/5 gap-4">
            <h1 className="text-xl">Order Summary</h1>
            <p className="flex justify-between w-full">
              SubTotal: <span>${subTotal.toFixed(2)}</span>{" "}
            </p>
            <div className="">
              <p className="flex justify-between w-full">
                Standard Shipping: <span>Free</span>{" "}
              </p>
              <p>Estimated delivery 2 - 5 working days</p>
            </div>
          </aside>
        </section>
      ) : (
        <div className="flex justify-center items-center h-96 w-full">
          <div className="flex flex-col">
          <p className="text-4xl font-bold text-center mb-8">YOUR BAG IS EMPTY</p>
          <div className="flex justify-between gap-7">
            <button className="bg-lightblack rounded-sm text-white text-xl py-2 px-4">Discover Products</button>
            <button className="rounded-sm text-lightgray border border-lightgray text-xl py-2 px-4">Home Page</button>
          </div>
          </div>
          
        </div>
      )}  
    </>
  );
}
