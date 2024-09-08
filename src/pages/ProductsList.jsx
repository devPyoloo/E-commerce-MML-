import axios from "axios";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../public/api";
import { useQuery } from "@tanstack/react-query";
import { IoChevronDownSharp } from "react-icons/io5";

const fetchProductsData = async () => {
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
    <div className="m-20 font-lora">
      {fetchError && <p>Error: {fetchError.message}</p>}
      <hr className="h-px my-8 bg-gray-200 border drop-shadow-xl" />
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex justify-evenly pt-20 items-start">
          <aside className="sticky top-40 mr-20 flex flex-col gap-4 w-64">
            <h1 className="mb-5 font-semibold text-xl">Categories</h1>
            {categories.map((cat) => (
              <div className="border-t border-t-lightblack pt-2" key={cat}>
                <button
                  className={` ${
                    cat === category
                      ? "font-medium"
                      : ""
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              </div>
            ))}
          </aside>

          <div className="flex flex-col">
            <div className="flex items-center">
              <span aria-label="Sort" className="flex">
                Sort By
                <button className="flex items-center py-1 px-4 rounded-sm">
                 <IoChevronDownSharp />
                </button>
              </span>
            </div>

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
