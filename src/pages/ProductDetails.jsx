import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../public/api";
import { useQuery } from "@tanstack/react-query";

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
    <main className="flex justify-center items-start">
      <div className="bg-mutedgray mb-3 flex justify-center items-center 2xl:w-72 2xl:h-72 w-56 h-56 overflow-hidden">
        <img
          className="2xl:w-28 w-20 object-center drop-shadow-lg hover:scale-125 transition-transform duration-300 ease-out"
          src={image}
          alt={name}
        />
      </div>

      <div className="flex flex-col items-start gap-y-1">
        <label className="font-semibold truncate w-full">{name}</label>
        <label className="text-gray-700">Stock left: {stock}</label>
        <label className="flex justify-between items-center">$ {price}</label>
        <p>{description}</p>
      </div>
    </main>
  );
}
