import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BASE_API_URL } from "../../../public/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Fetch product data based on category
const fetchProductsData = async (category) => {
  const { data } = await axios.get(BASE_API_URL);
  const filteredProducts = data.filter(
    (product) => product.category !== category
  );
  return filteredProducts;
};

export default function ProductsCarousel({ category }) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsData(category),
    staleTime: 3000,
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2560 },
      items: 6, // For very large screens
    },
    largeDesktop: {
      breakpoint: { max: 2560, min: 1440 },
      items: 5, // Large desktop monitors
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4, // Standard laptops/desktops
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3, // Portrait tablets
    },
    smallTablet: {
      breakpoint: { max: 768, min: 600 },
      items: 2, // Small tablets or landscape phablets
    },
    mobile: {
      breakpoint: { max: 600, min: 320 },
      items: 1, // Mobile devices
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error: {error.message}. Cannot fetch products data.</div>;

  return (
    <div className="mt-60 flex flex-col">
      <h1 className="text-xl mb-10 font-semibold lg:mb-20 lg:text-3xl">YOU MIGHT ALSO LIKE</h1>
      <Carousel responsive={responsive} infinite={true} autoPlay={true}>
        {products.map((product) => (
          <figure key={product.id}>
            <Link className="flex justify-center" to={`/products/${category}/${product.id}`}>
              <div className="bg-mutedgray mb-3 flex justify-center items-center w-72 h-72 hover:cursor-pointer hover:shadow-md">
                <img
                  className="md:w-24 w-24 object-center drop-shadow-lg"
                  src={product.imageFile}
                  alt={product.name}
                />
              </div>
            </Link>
          </figure>
        ))}
      </Carousel>
    </div>
  );
}

ProductsCarousel.propTypes = {
  category: PropTypes.string,
};
