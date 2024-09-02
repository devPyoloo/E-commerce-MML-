import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

export default function ProductsList() {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://my-mockup-product-data.s3.ap-southeast-2.amazonaws.com/products.json")
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message)
      }
    }
    fetchData()
  }, []);

  return (
    <>
    {error && <p>Error: {error}</p>}
    {products?.map((product) => (
      <div className="grid grid-cols-5 bg-white rounded-xl" key={product.id}>
        <label>{product.name}</label>
        <img className="w-20 drop-shadow-2xl" src={product.image} alt={product.name} />
      </div>
    ))}
    </>
    
  )
}