import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "/api";
import { useQuery } from "@tanstack/react-query";

const fetchProductsData = async () => {
  const { data } = await axios.get(BASE_API_URL);
  return data.products
}

export default function ProductsList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [imageLoaded, setImageLoaded] = useState({});


  const { data: products = [], isLoading, error: fetchError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsData,
    staleTime: 30000
  });

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
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
      <div className="category-button flex justify-between mb-20 border-b-2 border-b-gray-200">
        {categories.map((cat) => (
          <div className="mb-5" key={cat}>
            <button
              className={`py-2 px-8 rounded-sm font-lora text-gray-600 ${
                cat === category
                  ? "border-b-4 border-b-gray-500 "
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>
      { isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-y-32 mx-20 cursor-pointer">
          {filteredProducts.map((product) => (
            <figure className="product-card" key={product.id}>
              <Link to={product.id.toString()}>
                <div className="bg-mutedgray flex justify-center items-center w-72 h-72 overflow-hidden">
                  {!imageLoaded[product.id] && (
                    <div className="w-28 h-28 bg-gray-200 animate-pulse"></div>
                  )}
                  <img
                    className={`w-28 object-center drop-shadow-lg hover:scale-125 transition-transform duration-300 ease-out ${
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
        </div>
      )}
    </div>
  );
}