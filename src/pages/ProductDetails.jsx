import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "/api";
import { useQuery } from "@tanstack/react-query";

const fetchProductDetails = async (productId) => {
  const { data } = await axios.get(BASE_API_URL);
  const product = data.products.find((product) => product.id === parseInt(productId))
  console.log(product)
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


  const { name, description, price } = product;

  return (
    <>
      <div>
        {productId}
        {name} - {price}
      </div>
      <p>{description}</p>
    </>
  );
}
