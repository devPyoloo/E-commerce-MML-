import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../../public/api';
import { useQuery } from "@tanstack/react-query";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { useState } from "react";
import { useStore } from "../store/useStore";
import ProductsCarousel from "../components/Products Page/ProductsCarousel";
import Button from "../components/Button";
import StarRating from "../components/StarRating";

//Fetch product details
const fetchProductDetails = async (productId) => {
  const { data } = await axios.get(BASE_API_URL);
  const product = data.products.find(
    (product) => product.id === parseInt(productId)
  );

  return product;
};

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, addtoFavourite, favourite } = useStore((state) => ({
    addToCart: state.addToCart,
    addtoFavourite: state.addtoFavourite,
    favourite: state.favourite,
  }));

  const arrayFavourite = Array.isArray(favourite) ? favourite : [];

  const alreadyFavourite = arrayFavourite.some(
    (item) => item.id === parseInt(productId)
  );

  const [isActive, setIsActive] = useState(null);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProductDetails(productId),
    staleTime: 30000,
  });

  if (isLoading) return <div> Loading... </div>;
  if (error) return <div>{error.message} : Cannot fetch product details </div>;

  const {
    name,
    brand,
    description,
    ingredients,
    category,
    price,
    image,
    stock,
    size,
    usage,
    expirationDate,
    reviewCount,
    rating,
  } = product;

  return (
    <section className="mx-10 pt-20 lg:mx-20 mb-40 lg:pt-40">
      <div className="flex flex-col lg:flex-row justify-between lg:flex-wrap lg:items-start">
        <figure className="relative mb-10 bg-mutedgray flex flex-shrink-0 justify-center items-center lg:w-1/2 h-auto lg:py-28">
          <span className="absolute top-5 left-7 text-lightblack font-bold text-xl lg:text-2xl z-10">
            {brand}
          </span>
          <img
            className="w-40 lg:w-56 object-center drop-shadow-lg py-5"
            src={image}
            alt={name}
          />
        </figure>

        <main className="flex flex-col items-start gap-y-2 lg:w-2/5">
          <h1 className="font-bold text-2xl truncate w-full">
            {name}
            <span className="text-lg text-lighgray font-normal">({stock})</span>
          </h1>
          <p className="text-lg text-lighgray font-light">Skincare</p>
          <p className="font-bold text-3xl mt-5">$ {price}</p>

          <div className="w-full flex flex-col gap-5 mt-20 mb-10">
            <Button buttonType={"primary"} onClick={() => addToCart(product)}>
              Add to Bag
            </Button>
            <Button
              buttonType={"secondary"}
              onClick={() => addtoFavourite(product)}
            >
              Favourite
              {alreadyFavourite ? (
                <IoMdHeart className="font-bold text-3xl fill-red-600" />
              ) : (
                <IoMdHeartEmpty className="font-bold text-3xl" />
              )}
            </Button>
          </div>

          <div className="flex flex-col w-full">
            <button
              onClick={() => setIsActive(isActive === "about" ? null : "about")}
              className="flex justify-between py-4 items-center border-t border-t-lightgray text-lg"
            >
              About this product
              {isActive === "about" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isActive === "about" && (
              <div className="description pb-10">
                <h1 className="text-lightblack font-semibold text-md">
                  Description
                </h1>
                <p className="text-md font-light text-lightgray">
                  {description}
                </p>
                <p className="font-light text-lightgray">
                  <span className="text-lightblack font-semibold text-md">
                    Size
                  </span>
                  : {size}
                </p>
                <p className="font-light text-lightgray">
                  <span className="text-lightblack font-semibold text-md">
                    Expiration data
                  </span>
                  : {expirationDate}
                </p>

                <h1 className="text-lightblack font-semibold text-md mt-3">
                  Ingredients
                </h1>
                <p className="text-md font-light text-lightgray">
                  {ingredients}
                </p>

                <p className="text-lightgray mt-5 font-normal">
                  <em>Usage: {usage}</em>
                </p>
              </div>
            )}

            <div className="flex flex-col w-full">
              <button
                onClick={() =>
                  setIsActive(isActive === "reviews" ? null : "reviews")
                }
                className="flex justify-between py-4 items-center border-t border-t-lightgray text-lg"
              >
                <label>
                  Reviews
                  <span className="text-lightgray text-md">
                    ({reviewCount})
                  </span>
                </label>
                <div className="ratings flex justify-end items-center gap-x-3">
                  <StarRating rating={rating} />

                  <h1 className="text-lightblack font-semibold text-md">
                    {rating}
                  </h1>
                  {isActive === "reviews" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </button>
              {isActive === "reviews" && (
                <em className="text-light text-lightgray">
                  These display all lthe reviews and feedback about the product
                </em>
              )}
            </div>
          </div>
        </main>
      </div>

      <ProductsCarousel category={category} />
    </section>
  );
}
