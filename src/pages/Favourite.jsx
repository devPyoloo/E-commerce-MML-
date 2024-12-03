
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

export default function Favourite() {
  const favourite = useStore((state) => state.favourite);

  return (
    <section className="mb-20 pt-20 mx-20">
      <header className="flex justify-start mb-10 sticky top-0 py-3 bg-offwhite z-10">
        <h1 className="text-3xl font-semibold">
          Your {favourite.length > 1 ? "Favourites" : "Favourite"} <span className="text-xl text-lightgray">({favourite.length})</span>
        </h1>        
        </header>
        
     

      {favourite.length > 0 ? (
        <div className="grid gap-x-16 md:grid-cols-4 gap-y-32 cursor-pointer">
          {favourite.map((item) => (
            <figure className="item-card" key={item.id}>
              <Link to={`/products/${item.category}/${item.id.toString()}`}>
                <div className="relative bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56 overflow-hidden">
                <button
                        // onClick={() => {
                        //   removeCartProduct(item.id);
                        // }}
                        className="absolute right-2 top-2"
                      >
                        <FaHeart className="text-xl text-red-600" />
                      </button>
                  <img
                    className="2xl:w-28 w-20 object-center drop-shadow-md"
                    src={item.imageFile}
                    alt={item.name}
                  />
                </div>

                <div className="relative flex flex-col items-start gap-y-1">
                  <label className="font-semibold truncate w-full">
                    {item.name}
                  </label>
                  <label className="text-gray-700">
                    Stock left: {item.stock}
                  </label>
                  <label className="flex justify-between items-center">
                    $ {item.price}
                  </label>
                </div>
              </Link>
            </figure>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96 w-full">
          <div className="flex flex-col">
            <p className="text-4xl font-bold text-center mb-8">
              YOUR FAVOURITE IS EMPTY
            </p>
            <div className="flex justify-evenly gap-7">
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
    </section>
  );
}
