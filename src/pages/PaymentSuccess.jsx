import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/apiInterceptors";
import Button from "../components/Button";

export default function PaymentSuccess() {
  const { stripePaymentIntentId } = useParams();
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const { data } = await api.get(
          `http://localhost:8080/api/v1/user/checkout-details/${stripePaymentIntentId}`
        );
        setCheckoutDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (stripePaymentIntentId) {
      fetchCheckoutDetails();
    }
  }, [stripePaymentIntentId]);

  const {
    email,
    amount,
    barangay,
    city,
    province,
    zipCode,
    firstName,
    lastName,
    phoneNumber,
    createdAt,
    cartItems,
  } = checkoutDetails || {};

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formattedDate = useMemo(() => formatDate(createdAt), []);

  return (
    <section className="mx-10 lg:mx-20 mb-20 lg:p-10 rounded-lg gap-y-10 py-24">
      <h1 className="flex text-xl lg:text-3xl font-bold mb-3 text-lightblack">
        <FaCheckCircle className="text-green-500 mr-2" />
        Thanks for your order!
      </h1>
      <p className="text-lightgray">
        Your order will be processed within 24 hours during working days. We
        will notify you by email once your order has been shipped.
      </p>
      <div className="flex lg:flex-row flex-col lg:gap-x-20 my-10">
        <main className="w-full flex flex-col p-y-4  xl:text-lg">
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Payment number</span>
            <span className="font-medium">#{stripePaymentIntentId}</span>
          </label>
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Date</span>
            <span className="font-medium">{formattedDate}</span>
          </label>
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Name</span>
            <span className="font-medium">
              {firstName} {lastName}
            </span>
          </label>
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Address</span>
            <span className="font-medium">
              {barangay}, {city} {province}, {zipCode}
            </span>
          </label>
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Phone</span>
            <span className="font-medium">{phoneNumber}</span>
          </label>
          <label className="flex py-4 justify-between border-b-gray-300 border-b">
            <span className="text-lightgray">Email</span>
            <span className="font-medium">{email}</span>
          </label>
        <div className="flex gap-x-5 mt-10">
        <Link to={"/view-orders"}>
          <button className="bg-mutedblack text-white hover:opacity-85 rounded-lg lg:text-base p-2">Track your order</button>
        </Link>
       
        <Link to={"/products/All"}>
          <button className="text-lightgray border-2 border-lighgray hover:border-black rounded-lg lg:text-base p-2">Return to shopping</button>
        </Link>
      </div>
        </main>


        <aside className="w-full bg-extraLightGray border border-lightgray/15 p-4 rounded-lg">
          <h1 className="text-xl font-semibold mb-3">Order Summary</h1>
          <ul>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id || item.name} >
                  <figure className="grid grid-cols-4 items-center place-items-end border-b-2 py-2">
                    <span className="flex items-center col-span-2 w-full">
                      {" "}
                      <img
                        className="w-12 mr-3"
                        src={item.imageFile}
                        alt={item.name}
                      />
                      <p className="w-full text-sm font-medium truncate">
                        {item.name}
                      </p>
                    </span>
                    <span className="text-center">x{item.quantity} </span>
                    <span className="text-lg font-semibold">${item.price}</span>
                  </figure>
                </li>
              ))
            ) : (
              <p>No items ordered.</p>
            )}
            <p className="py-2 font-semibold text-lg">
              Total: <span className="float-end">${amount}</span>
            </p>
          </ul>
        </aside>
      </div>
    </section>
  );
}
