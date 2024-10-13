import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function PaymentSuccess() {
  const { stripePaymentIntentId } = useParams();
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/checkout/checkout-details/${stripePaymentIntentId}`);
         setCheckoutDetails(data);
      } catch (error) {
        console.log(error)
      }
    }
    if(stripePaymentIntentId) { fetchCheckoutDetails() }
  }, [stripePaymentIntentId])

  const { email, amount, barangay, city, province, zipCode, firstName, lastName, phoneNumber, createdAt, cartItems } = checkoutDetails || {};

  return (
    <section className="mx-20 mb-20 p-10 rounded-lg gap-y-10 py-24">
      <h1 className="text-3xl font-bold">Thanks for your order!</h1>
      <p className="text-lightgray">Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
      <div className="grid grid-cols-2 my-10">
      <main className="w-full flex flex-col p-4">
      <label>Payment Id: <span>{stripePaymentIntentId}</span></label>
      <label>Date: <span>{createdAt}</span></label>
      <label>Name: <span>{firstName} {lastName}</span></label>
      <label>Address<span>{barangay}, {city} {province}, {zipCode}</span></label>
      <label>Phone: <span>{phoneNumber}</span></label>
      <label>Email: <span>{email}</span></label>
      </main>

      <aside className="w-full bg-extraLightGray border border-white p-4 rounded-lg">
        <h1 className="text-xl font-semibold">Order Summary</h1>
        <ul>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id}>
              <p className="grid grid-cols-3 place-items-center border-b-2 py-2">{item.name} <span>x{item.quantity} </span> <span>{item.price}</span> </p>
              </li>
          ))
        ) : (
            <p>No items ordered.</p>
        )}

        </ul>
        
      </aside>
      </div>
      
    </section>
  )
}
