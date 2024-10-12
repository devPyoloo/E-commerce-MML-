import { FaCheckCircle } from "react-icons/fa";
import { useStore } from "../store/useStore";


export default function PaymentSuccess() {
  const amount = useStore((state) => state.total);

  return (
    <section className="mx-20 mb-20 p-10 rounded-lg gap-y-10 py-24">
      <h1 className="text-3xl font-bold">Thanks for your order!</h1>
      <p className="text-lightgray">Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
      <div className="grid grid-cols-2 my-10">
      <main className="w-full">
      <FaCheckCircle className="fill-green-400 text-8xl drop-shadow-xl"/>
      <header className="flex flex-col justify-center items-center">

      <h1 className="text-xl font-semibold">Your payment was successful!</h1>
      <label className="text-xl">${amount}</label>
      </header>
      <p className="text-lg text-lightgray text-center">Payment successful! Your order has been placed successfully. Thank you for shopping with us!</p>
      </main>

      <aside className="w-full bg-extraLightGray border border-white p-4 rounded-lg">
        <h1 className="text-xl font-semibold">Order Summary</h1>
      </aside>
      </div>
      
    </section>
  )
}
