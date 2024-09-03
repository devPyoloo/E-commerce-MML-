import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { IoIosPricetags } from "react-icons/io";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");

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
      }
    };
    fetchData();
  }, []);

  const fulterByCategory = (cat) => {
    setCategory(cat);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
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
    <div className="mx-20">
      {error && <p>Error: {error}</p>}
      <div className="category-button flex justify-between mb-20">
        {categories.map((cat) => (
          <div key={cat}>
            <button
              className={`py-2 px-8 rounded-md ${
                cat === category
                  ? "bg-gray-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => fulterByCategory(cat)}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 mx-20">
        {filteredProducts.map((product) => (
          <figure className="product-card" key={product.id}>
            <img
              className="w-14 drop-shadow-2xl hover:scale-110 transition-transform duration-200 ease-in-out"
              src={product.image}
              alt={product.name}
            />

            <div
              className=" relative flex flex-col justify-center items-center p-3 rounded-2xl gap-3"
              
            >
              <span className="absolute right-0 top-0 font-bold">
                {" "}
                Stock left: {product.stock}
              </span>

              <label>{product.name}</label>
              <span className="flex justify-between items-center">
                <IoIosPricetags /> ${product.price}
              </span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
