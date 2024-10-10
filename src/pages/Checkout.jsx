import { useState } from "react";
import { useStore } from "../store/useStore";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from "axios";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutComponent() {
  const cart = useStore((state) => state.cart);
  const subTotal = useStore((state) => state.total);
  const [clientSecret, setClientSecret] = useState(""); 
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    barangay: '',
    city: '',
    province: '',
    zipCode: '',
  });

  const stripe = useStripe();
  const elements = useElements();


  const handleChange = (e) => {
    const { name, value } = e.target;
      setCheckoutDetails((prev) => ({...prev, [name]: value}));
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Create payment intent by sending a request to your backend
      const { data: paymentIntent  } = await axios.post('http://localhost:8000/api/checkout/create-payment-intent', {
        amount: subTotal * 100, // Amount in cents
        currency: 'usd',
        items: cart,
        ...checkoutDetails
      });

      setClientSecret(paymentIntent.clientSecret)

      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/checkout-success",
        },
      });

      if (error) {
        console.error(error.message);
      } else if (confirmedPaymentIntent.status === "succeeded") {
        console.log("Payment successful:", confirmedPaymentIntent);
        // Optionally, send the order details to the server here
        await axios.post('http://localhost:8000/api/checkout/save', {
          ...checkoutDetails,
          items: cart,
          total: subTotal,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(cart)

  return (
    <div className="flex flex-col mx-10 lg:mx-20 pt-20">
      <h1 className="text-center text-lightblack text-4xl font-bold mb-20">
        CHECKOUT
      </h1>
      <section className="flex flex-col-reverse justify-evenly items-start lg:flex-row">
        <form onSubmit={handleSubmitOrder} className="mt-10 mb-40 lg:w-3/5 lg:pr-56 lg:mt-0">
          <div className="contact flex flex-col gap-y-5 pb-10">
            <h1 className="group text-xl font-semibold">Contact</h1>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="number"
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Phone Number *"
            />
          </div>

          <div className="address flex flex-col gap-y-5 pb-10">
            <h1 className="group text-xl font-semibold">Address</h1>
            <div className="grid grid-cols-2 gap-5">
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="First Name *"
              />
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name *"
              />
            </div>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name="barangay"
              onChange={handleChange}
              placeholder="Barangay *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name="city"
              onChange={handleChange}
              placeholder="City *"
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name="province"
                onChange={handleChange}
                placeholder="Province *"
              />
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="number"
                name="zipCode"
                onChange={handleChange}
                placeholder="Zip Code *"
              />
            </div>
          </div>


          <div className="card-details flex flex-col gap-y-5 pb-10">
            <h1 className="group text-xl font-semibold">Billing Address</h1>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Street Address"
            />
            <div className="grid grid-cols-2 gap-5">
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="City"
              />
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="Zip Code"
              />
            </div>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Country"
            />
          </div>

          <div className="flex justify-center">
          {clientSecret && <PaymentElement />}
            <button type="submit" disabled={!stripe || !elements} className="w-1/2 rounded-full text-xl py-6 bg-mutedblack text-white hover:opacity-90">
              Place Order
            </button>
          </div>
        </form>

        <aside className="lg:w-1/3">
          <div className="flex flex-col gap-4 text-base lg:text-xl">
            <h1 className="text-2xl font-medium">Order Summary</h1>
            <p className="flex justify-between w-full">
              SubTotal: <span>${subTotal.toFixed(2)}</span>{" "}
            </p>

            <div>
              <p className="flex justify-between w-full">
                Standard Shipping: <span>Free</span>{" "}
              </p>
              <p className="text-base text-lightgray">
                Estimated delivery 2 - 5 working days
              </p>
            </div>

            <p className="flex justify-between w-full border-y border-y-mutedgray py-4 lg:my-10">
              Total: <span>${subTotal.toFixed(2)}</span>{" "}
            </p>
          </div>

          {cart.map((item) => (
            <figure
              className="w-full flex justify-between items-center gap-x-5 border-b border-b-gray-200 py-10"
              key={item.id}
            >
              <div className="bg-mutedgray mb-3 flex justify-center items-center w-44 h-44">
                <img
                  className="w-14 object-center drop-shadow-lg"
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div className="w-1/2 flex flex-col items-start text-md">
                <label className="font-semibold">{item.name}</label>
                <label className="text-gray-700">{item.category}</label>
                <label className="text-gray-700 flex">
                  Quantity: {item.quantity}
                </label>
                <label className="font-semibold">$ {item.price}</label>
              </div>
            </figure>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutComponent />
    </Elements>
  );
}


          {/* <div className="payment flex flex-col gap-y-5 pb-10">
            <h1 className="text-xl font-semibold">Payment</h1>
            <div className="hover:bg-mutedgray p-4 rounded-sm">
              <label className="flex justify-between">
                <img
                  className="w-24"
                  src="/assets/paypal-icon.png"
                  alt="Paypal"
                />
                <input
                  className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                  type="radio"
                  onChange={handleChange}
                  name="paymentMethod"
                />
              </label>
            </div>
            <div className="hover:bg-mutedgray p-4 rounded-sm">
              <label className="flex justify-between">
                <img
                  className="w-14"
                  src="/assets/mastercard-icon.png"
                  alt="mastercard"
                />
                <input
                  className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                  type="radio"
                  onChange={handleChange}
                  name="paymentMethod"
                />
              </label>
            </div>

            <div className="hover:bg-mutedgray p-4 rounded-sm">
              <label className="flex justify-between">
                <img className="w-16" src="/assets/visa-icon.png" alt="visa" />
                <input
                  className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                  type="radio"
                  onChange={handleChange}
                  name="paymentMethod"
                />
              </label>
            </div>

            <div className="hover:bg-mutedgray p-4 rounded-sm ">
              <label className="flex justify-between has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                <img
                  className="w-24"
                  src="/assets/alipay-icon.png"
                  alt="Alipay"
                />
                <input
                  className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray checked:border-indigo-500"
                  type="radio"
                  onChange={handleChange}
                  name="paymentMethod"
                />
              </label>
            </div>
          </div>

          <div className="card-details flex flex-col gap-y-5 pb-10">
            <h1 className="text-xl font-semibold">Card Details</h1>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Card Number *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Expiration Date *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="CVC/CVV *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Cardholder's Name *"
            />
          </div> */}