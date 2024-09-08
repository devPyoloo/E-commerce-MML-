import axios from "axios";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../public/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IoChevronDownSharp } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const fetchProductsData = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(BASE_API_URL);
  return data.products;
};

export default function ProductsList() {
  const [category, setCategory] = useState("All");
  const [imageLoaded, setImageLoaded] = useState({});

  const {
    data: products = [],
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsData,
    staleTime: 30000,
  });

  const { data, isLoading: fetchData, error } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductsData,
    initialPageParam: 1
  })

  const filteredProducts = useMemo(() => {
    if (category === "All") return products;
    return products.filter((product) => product.category === category);
  }, [category, products]);

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const categories = [
    "All",
    "Skincare",
    "Haircare",
    "Body Care",
    "Makeup",
    "Fragrance",
    "Supplements",
  ];

  return (
    <div className="font-lora">
      {fetchError && <p>Error: {fetchError.message}</p>}
      <hr className="h-px my-8 bg-gray-200 border drop-shadow-xl" />
      <div className="flex justify-between items-center pr-10 pl-20 sticky top-0 py-3 bg-offwhite z-10">
        <h1 className="font-semibold text-xl">Categories</h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-md font-normal">
              Sort By Price
              <IoChevronDownSharp
                aria-hidden="true"
                className="-mr-1 h-5 w-5"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-0 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  High - Low
                </span>
              </MenuItem>
              <MenuItem>
                <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Low - High
                </span>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex justify-evenly items-start mx-20">
          <aside className="sticky top-40 mr-20 flex flex-col gap-4 w-64">
            {categories.map((cat) => (
              <div className="border-t border-t-lightblack pt-2" key={cat}>
                <button
                  className={` ${cat === category ? "font-medium" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              </div>
            ))}
          </aside>

          <div className="flex flex-col">
            <main className="grid gap-x-16 md:grid-cols-4 gap-y-32 cursor-pointer">
              {filteredProducts.map((product) => (
                <figure className="product-card" key={product.id}>
                  <Link to={product.id.toString()}>
                    <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56 overflow-hidden">
                      {!imageLoaded[product.id] && (
                        <div className="w-28 h-28 bg-gray-200 animate-pulse"></div>
                      )}
                      <img
                        className={`2xl:w-28 w-20 object-center drop-shadow-lg hover:scale-125 transition-transform duration-300 ease-out ${
                          imageLoaded[product.id] ? "block" : "hidden"
                        }`}
                        src={product.image}
                        alt={product.name}
                        onLoad={() => handleImageLoad(product.id)}
                      />
                    </div>

                    <div className="relative flex flex-col items-start gap-y-1">
                      <label className="font-semibold truncate w-full">
                        {product.name}
                      </label>
                      <label className="text-gray-700">
                        Stock left: {product.stock}
                      </label>
                      <label className="flex justify-between items-center">
                        $ {product.price}
                      </label>
                    </div>
                  </Link>
                </figure>
              ))}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
