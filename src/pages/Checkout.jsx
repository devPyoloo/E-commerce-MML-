import { useStore } from "../store/useStore";

export default function Checkout() {
  const cart = useStore((state) => state.cart);
  const subTotal = useStore((state) => state.total);

  return (
    <div className="flex flex-col mx-20 pt-20">
      <h1 className="text-center text-lightblack text-4xl font-bold mb-20">
        CHECKOUT
      </h1>
      <section className="flex justify-evenly items-start">
        <form className="w-3/5 pr-56 mb-40">
          <div className="contact flex flex-col gap-y-5 pb-10">
            <h1 className="group text-xl font-semibold">Contact</h1>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Email *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Phone Number *"
            />
          </div>

          <div className="address flex flex-col gap-y-5 pb-10">
            <h1 className="group text-xl font-semibold">Address</h1>
            <div className="grid grid-cols-2 gap-5">
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="First Name *"
              />
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="Last Name *"
              />
            </div>
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="Barangay *"
            />
            <input
              className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
              type="text"
              name=""
              placeholder="City *"
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="Province *"
              />
              <input
                className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                type="text"
                name=""
                placeholder="Zip Code *"
              />
            </div>
          </div>

          <div className="payment flex flex-col gap-y-5 pb-10">
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
                  name="card"
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
                  name="card"
                />
              </label>
            </div>

            <div className="hover:bg-mutedgray p-4 rounded-sm">
              <label className="flex justify-between">
                <img className="w-16" src="/assets/visa-icon.png" alt="visa" />
                <input
                  className="p-5 rounded-sm bg-transparent text-lightgray border border-lightgray placeholder:text-lightgray"
                  type="radio"
                  name="card"
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
                  name="card"
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
<button className="w-1/2 rounded-full text-xl py-6 bg-mutedblack text-white hover:opacity-90">
      Place Order
    </button>
</div>
          
        </form>

        <aside className="w-1/3">
          <div className="flex flex-col gap-4 text-xl">
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

            <p className="flex justify-between w-full border-y border-y-mutedgray py-4 my-10">
              Total: <span>${subTotal.toFixed(2)}</span>{" "}
            </p>
          </div>

          {cart.map((item) => (
            <figure
              className="w-full flex justify-between items-center border-b border-b-gray-200 py-10"
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
