import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../public/api";
import { useQuery } from "@tanstack/react-query";
import { IoMdHeartEmpty, IoIosArrowDown } from "react-icons/io";


const fetchProductDetails = async (productId) => {
  const { data } = await axios.get(BASE_API_URL);
  const product = data.products.find(
    (product) => product.id === parseInt(productId)
  );
  console.log(product);
  return product;
};

export default function ProductDetails() {
  const { productId } = useParams();

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

  const { name, description, price, image, stock } = product;

  return (
    <section className="flex justify-evenly items-start mx-20 mb-40 pt-40">
      <figure className="relative bg-mutedgray flex justify-center items-center md:w-1/2 h-auto md:py-28 overflow-hidden">
        <span className="absolute top-5 left-7 text-lightblack font-bold text-2xl z-10">
          CeRave
        </span>
        <img
          className="w-56 object-center drop-shadow-lg hover:scale-125 transition-transform duration-300 ease-out"
          src={image}
          alt={name}
        />
      </figure>

      <main className="flex flex-col items-start gap-y-2">
        <h1 className="font-bold text-2xl truncate w-full">
          {name}{" "}
          <span className="text-lg text-lighgray font-normal">({stock})</span>
        </h1>
        <p className="text-lg text-lighgray font-light">Skincare</p>
        <p className="font-bold text-3xl mt-5">$ {price}</p>

        <div className="w-full flex flex-col gap-5 mt-20 mb-10">
          <button className="w-full bg-mutedblack rounded-full text-white text-xl py-6 hover:opacity-90">
            Add to Bag
          </button>
          <button className="w-full flex justify-center items-center gap-4 rounded-full text-lightgray border-2 border-lighgray text-xl py-6 hover:border-black">
            Favourite{" "}
            <IoMdHeartEmpty className="font-bold text-3xl fill-black" />
          </button>
        </div>

        <div className="w-full flex flex-col">
          <button className="flex justify-between py-4 items-center border-t border-t-lightgray">About this product <IoIosArrowDown /></button>
        </div>
      </main>
    </section>
  );
}
