import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { BASE_API_URL } from '../../public/api';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import CategoryFilter from "../components/Products Page/CategoryFilter";
import RenderProducts from "../components/Products Page/RenderProducts";
import MenuBar from "../components/Products Page/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const fetchProductsData = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(BASE_API_URL);
  const productsPerPage = 24;
  const start = (pageParam - 1) * productsPerPage;
  const end = start + productsPerPage;
  return data.slice(start, end);
};

export default function ProductsList() {
  // const [category, setCategory] = useState("All");
  const { category = "All" } = useParams();
  const navigate = useNavigate()
  const [imageLoaded, setImageLoaded] = useState({});
  const [sortBy, setSortBy] = useState("");
  const { ref, inView } = useInView();

  const {
    data: products = [],
    isLoading,
    isFetching,
    error: fetchError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProductsData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    staleTime: 30000,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const allProducts = products.pages?.flat() || [];
    return category === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === category);
  }, [category, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortBy === "High - Low") {
      return sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Low - High") {
      return sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const handleCategoryChange = (cat) => {
    navigate(`/products/${cat}`)
  }

  return (
    <div className="font-lora mb-20">
      {fetchError && <p>Error: {fetchError.message}</p>}
      <hr className="h-px my-8 bg-gray-200 border" />

      {/* Menu Bar  */}
      <MenuBar setSortBy={setSortBy} category={category} handleCategoryChange={handleCategoryChange} />

      {isLoading ? (
        <p className="my-28 flex items-center justify-center gap-x-2 text-center text-xl lg:text-2xl"><CgSpinner className="animate-spin lg:text-4xl text-xl" /> Loading...</p>
      ) : ( 
        <div className="lg:flex justify-evenly items-start mx-5 lg:mx-20">
          {/* CategoryFilter */}
          <aside className="sticky top-40 mr-20 md:flex flex-col gap-4 lg:w-52 hidden">
          <CategoryFilter category={category} handleCategoryChange={handleCategoryChange} />
          </aside>
          

          {/* Render Products */}
          <RenderProducts
            sortedProducts={sortedProducts}
            imageLoaded={imageLoaded}
            handleImageLoad={handleImageLoad}
            ref={ref}
            isFetching={isFetching}
          />
        </div>
      )}
    </div>
  );  
}
