import axios from "axios";
import { useLoaderData } from "react-router-dom"


export default function ProductDetails() {
  const product = useLoaderData()

  return (
    <div>{product.name} - {product.price}</div>
  )
}

export const productDetailsLoader = async ({ params }) => {
  const API_URL = "https://my-mockup-product-data.s3.ap-southeast-2.amazonaws.com/products.json";
  const { id } = params;

  try {
    const response = await axios.get(API_URL + id);
    return response.data
  } catch (error) {
    throw new Error("Could not find that product", error)
  }

}
