import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { CgSpinner } from "react-icons/cg";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import api from "../utils/apiInterceptors";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutComponent({ clientSecret, subTotal }) {
  const { cart, clearCart, setTotal } = useStore();
  const navigate = useNavigate();


  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    barangay: "",
    city: "",
    province: "",
    zipCode: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // 2. Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: "http://localhost:5173/payment-success", // Update with your route
        },
        redirect: "if_required",
      });

      if (error) {
        console.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment successful:", paymentIntent);

        // 3. Save order details in backend
        const filteredCart = cart.map((item) => ({
          productId: item.id,
          name: item.name,
          imageFile: item.imageFile,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
        }));

        await api.post(
          "http://localhost:8080/api/v1/user/save-order",
          {
            ...checkoutDetails,
            amount: subTotal,
            stripePaymentIntentId: paymentIntent.id,
            cartItems: filteredCart,
          }
        );

        clearCart();
        setTotal();
        navigate(`/payment-success/${paymentIntent.id.toString()}`);
      }
    } catch (error) {
      console.error("Payment error:", error.message);
    }
  };



  return (
    <div className="flex flex-col mx-10 lg:mx-20 pt-20">
      <h1 className="text-center text-lightblack text-4xl font-bold mb-20">
        CHECKOUT
      </h1>
      <section className="flex flex-col-reverse justify-evenly items-start lg:flex-row">
        <form
          onSubmit={handleSubmitOrder}
          className="mt-10 mb-40 lg:w-3/5 lg:pr-56 lg:mt-0"
        >
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

          <div className="address flex flex-col gap-y-5 pb-5">
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
          <label className="text-xl font-semibold text-mutedblack">
            <input className="mr-2 w-4 h-4" type="checkbox" checked readOnly />
            Billing address same as shipping
          </label>

          <div className="mt-10">{clientSecret && <PaymentElement />}</div>

          <div className="flex justify-end mt-16">
            <button
              type="submit"
              disabled={!stripe || !elements}
              className="w-1/2 rounded-full text-xl py-6 bg-mutedblack text-white hover:opacity-90"
            >
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
                  src={item.imageFile}
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

CheckoutComponent.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  subTotal: PropTypes.number.isRequired,
};

export default function Checkout() {
  const subTotal = useStore((state) => state.total);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (subTotal <= 0) return;
      try {
        const { data } = await api.post(
          "http://localhost:8080/api/v1/user/create-payment-intent",
          {
            amount: subTotal * 100, // Amount in cents
          }
        );

        // Ensure you set the clientSecret correctly
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Client Secret not found in response");
        }
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
      }
    };
    fetchClientSecret();
  }, [subTotal]);

  if (!clientSecret) {
    return (
      <p className="my-28 flex items-center justify-center gap-x-2 text-center text-xl lg:text-2xl">
        <CgSpinner className="animate-spin lg:text-4xl text-xl" /> Loading...
      </p>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutComponent clientSecret={clientSecret} subTotal={subTotal} />
    </Elements>
  );
}