import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({}); 

  const API_URL =
    "https://my-mockup-product-data.s3.ap-southeast-2.amazonaws.com/products.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  const filterByCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };

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
      {error && <p>Error: {error}</p>}
      <div className="category-button flex justify-between mb-20 border-b-2 border-b-gray-200">
        {categories.map((cat) => (
          <div className="mb-5" key={cat}>
            <button
              className={`py-2 px-8 rounded-sm font-lora text-gray-600 ${
                cat === category
                  ? "border-b-4 border-b-gray-500 "
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>
      {isFetching && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-y-32 mx-20 cursor-pointer">
        {filteredProducts.map((product) => (
          <figure className="product-card" key={product.id}>
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
              <label className="text-gray-700">Stock left: {product.stock}</label>
              <label className="flex justify-between items-center">
                $ {product.price}
              </label>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
